const AWS = require('aws-sdk');



module.exports = class DynamoDBConnection {

  constructor(state, tableName) {
    console.log("state is: " + state);
    this.state = state;
    AWS.config.update(process.env.AWS_REGION);
    this.docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

    this.params = {
      TableName: tableName,
      FilterExpression: "#state = :state",
      ExpressionAttributeNames: { "#state": "state" },
      ExpressionAttributeValues: {
        ':state': state
      }
    };
  }

  async getCicSessionId() {
    try {
      const res = await this.docClient.scan(this.params).promise();
      const sessionId = res.Items[0].sessionId;
      return sessionId;
    } catch (err) {
      return err;
    }
  }

  async getCicSessionAuthSessionState() {
    try {
      const res = await this.docClient.scan(this.params).promise();
      const authSessionState = res.Items[0].authSessionState;
      return authSessionState;
    } catch (err) {
      return err;
    }
  }
}

