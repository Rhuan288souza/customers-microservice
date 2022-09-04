
# Customers Microservice

This documentation aims to describe the API created for a customers microservice, as well as provide further information necessary to use the code.
Make sure to create the necessary AWS keys, because you will need them for authorization when making requests to the endpoints.


# Overview

This API uses the following technologies, so a basic understanding of these topics is highly recommended

- Node.js
- TypeScript
- Algolia
- Bitbucket Pipelines
- Jest
- Serverless
- DynamoDB


## API Reference

#### Create customer

```http
  POST /customers/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `object` | **Required**. The fields of the new custumer you are creating |

#### Get customer

```http
  GET /customers/get/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update customer

```http
  PUT /customers/update/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the item you want to update |
| `body`| `object` | **Required**. The fields of the new custumer you are updating |

#### Delete customer

```http
  DELETE /customers/delete/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

#### List customers

```http
  GET /customers/list
```

#### Free Search
Endpoint that performs a free text search across all customer fields

```http
  GET /customers/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `text`      | `string` | **Required**. Text to be searched |





## Environment Variables

To run this project, you will need to create an account on Algolia and add the following environment variables to your ssm. This is due to DynamoDB not having full-text search natively

`ALGOLIA_APP_ID`

`ALGOLIA_ADMIN_API_KEY`

Also, in Bitbucket, make sure to have the following environment variables:

`AWS_ACCESS_KEY`

`AWS_SECRET_ACCESS_KEY`




## Running Tests

To run tests, run the following command

```bash
  npm test
```


## Optimizations

There's still a need to improve this project in some aspects, such as :
- Add new tests 
- Creating different deployment stages
- Creating new steps and configs in the pipeline
- Creating different stacks for testing and deployments

## Licence

MIT.