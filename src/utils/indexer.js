import AWS from 'aws-sdk'

const algoliasearch = require("algoliasearch")
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex("customers")

export const handler = async (event) => {
    const newImage = event.Records[0].dynamodb.NewImage
    const oldImage = event.Records[0].dynamodb.OldImage
    const eventName = event.Records[0].eventName

    if(eventName === 'INSERT') await saveObject(newImage)
    if(eventName === 'MODIFY') await updateObject(newImage)
    if(eventName === 'REMOVE') await deleteObject(oldImage)
}

// Private 

const saveObject = async (object) => {
    const unmarshalled = AWS.DynamoDB.Converter.unmarshall(object)
    const toInsert = {
        ...unmarshalled,
        objectID: unmarshalled.id
    }
    delete toInsert.id
    await index.saveObjects([toInsert])
        .catch(err => {
            console.log(err)
        })
}

const deleteObject = async (object) => {
    const unmarshalled = AWS.DynamoDB.Converter.unmarshall(object)
    await index.deleteBy({
        filters: `objectID:${unmarshalled.id}`
    })
        .catch(err => {
            console.log(err)
        })
}

const updateObject = async (newImage) => {
    const unmarshalledNewImage = AWS.DynamoDB.Converter.unmarshall(newImage)
    const toUpdate = {
        ...unmarshalledNewImage,
        objectID: unmarshalledNewImage.id
    }
    delete toUpdate.id

    await index.partialUpdateObject(toUpdate)
        .catch(err => {
            console.log(err)
        })
}