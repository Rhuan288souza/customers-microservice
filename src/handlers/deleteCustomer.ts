import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from 'aws-sdk';

AWS.config.update({region:'sa-east-1'});

const client = new AWS.DynamoDB.DocumentClient;
const tableName: string = process.env.CUSTOMERS_TABLE || 'CustomersInfo-beta';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;
    
    const result = await client.get({
        TableName: tableName,
        Key: {
            id
        }
    }).promise();

  if(!result.Item){
    return {
        statusCode: 404,
        body: JSON.stringify({ error: "Customer not found"})
    };
  };
  await client.delete({
      TableName: tableName,
      Key:{
        id
      }
  }).promise();

  return {
    statusCode: 204,
    body: JSON.stringify({ msg: "Customer deleted successfully"})
  }
};
