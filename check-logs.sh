#!/usr/bin/env bash

test_data="./test/browser/support/cicUserData.json"
firstName=$(jq -r '.firstName' "$test_data")
middleName=$(jq -r '.middleName' "$test_data")
lastName=$(jq -r '.lastName' "$test_data")
birthDate=$(jq -r '.dob' "$test_data")

query="fields @timestamp, @message, @logStream, @log | filter @message like \"$firstName\""

function update_query_string() {
  # Get the array of search strings as arguments  
  local searchStrings=("$@")

  for value in "${searchStrings[@]}"
  do
    query+=" or @message like \"$value\""
  done

  # Return the updated query string
  echo $query
}

query=$(update_query_string $middleName $lastName $birthDate)
echo $query

stack_name="cic-cri-front"
log_groups=(
    "/aws/ecs/$stack_name-CICFront-ECS"
)

current_epoch=$(date +%s)
fifteen_mins_ago_epoch=$((current_epoch - (15 * 60)))

start_time=$fifteen_mins_ago_epoch
end_time=$current_epoch

query_id=$(aws logs start-query \
    --log-group-names "${log_groups[@]}" \
    --start-time "$start_time" \
    --end-time "$end_time" \
    --query-string "$query" \
    --output text --query 'queryId')

status="Running"
while [ "$status" = "Running" ]; do
    echo "Waiting for query to complete..."
    sleep 1
    query_status=$(aws logs get-query-results --query-id "$query_id")
    status=$(echo "$query_status" | grep -o '"status": "[^"]*"' | cut -d '"' -f 4)
done

if echo "$query_status" | grep -q '"results": \[\]'; then
    echo "Query found no PII 🎉"
    exit 0
else
    echo "Query returned results:"
    echo "$query_status" | jq -r '.results[] | @json'
    exit 1
fi
