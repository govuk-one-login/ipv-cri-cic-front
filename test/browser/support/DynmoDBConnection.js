const AWS = require('aws-sdk');

module.exports = class DynamoDBConnection{

constructor(sessionid , tableName)
{
    AWS.config.update(process.env.AWS_REGION);
    this.docClient = new AWS.DynamoDB.DocumentClient();

    this.params = {
        TableName: tableName,
        Key: {'sessionId': sessionid}
    };
}

async getDBDetails()
{
    try {
        let res = await this.docClient.get(this.params).promise();
        return JSON.stringify(res.Item) ;
     } catch(err) {
        return err;
     }
   
}   
}
