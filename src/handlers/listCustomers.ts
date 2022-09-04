import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from 'aws-sdk';

AWS.config.update({region:'sa-east-1'});

const client = new AWS.DynamoDB.DocumentClient;
const tableName: string = process.env.CUSTOMERS_TABLE || 'CustomersInfo-beta';
const headers = {
    'Content-Type': 'application/json'
};

export const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {    
    const result = await client.scan({
        TableName: tableName,
    }).promise();

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result.Items)
  };
};
