import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import AWS from 'aws-sdk'
import { v4 } from 'uuid'

AWS.config.update({region:'sa-east-1'})

const client = new AWS.DynamoDB.DocumentClient
const tableName: string = process.env.CUSTOMERS_TABLE as string;
const headers = {
    'Content-Type': 'application/json'
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const reqBody = typeof event.body === 'object' ? event.body : JSON.parse(event.body as string);

    const customer = {
        id: v4(),
        ...reqBody
    }
    
    await client.put({
        TableName: tableName,
        Item: customer
    }).promise()

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify(customer)
  }
}
