import { APIGatewayProxyEvent } from "aws-lambda";

const algoliasearch = require("algoliasearch")
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex("customers")

const headers = {
    'Content-Type': 'application/json'
}

export const handler = async (event: APIGatewayProxyEvent): Promise<Object> => {
    const text = event.queryStringParameters?.text
    let result

    await index.search(text)
    .then(({ hits } : any) => {
        result = hits.map(( {_highlightResult, ...item } : any) => item)
    })
    .catch((err: any) => {
        console.log(err)
    })

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result)
  }
};
