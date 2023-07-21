const AWS = require('aws-sdk');



module.exports = class DynamoDBConnection {

  constructor(state, tableName) {
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

  async getCicItem() {
    try {
      const res = await this.docClient.scan(this.params).promise();
      this.sessionId = res.Items[0].sessionId;
      this.authSessionState = res.Items[0].authSessionState;
      this.authorizationCode = res.Items[0].authorizationCode;
      this.redirectUri = res.Items[0].redirectUri;
    } catch (err) {
      return err;
    }
  }

  async getCicSessionAuthSessionState() {
    return this.authSessionState;
  }

  async getCicSessionId() {
    return this.sessionId;
  }

  async getCicSessionAuthorizationCode() {
    return this.authorizationCode;
  }

  async getCicSessionRedirectUri() {
    return this.redirectUri;
  }
}

