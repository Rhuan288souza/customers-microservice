export {}

const createCustomer = require ('../src/handlers/createCustomer')
const getCustomer = require('../src/handlers/getCustomer')
const eventGenerator = require('./testUtils/eventGenerator')
const validators = require('./testUtils/validators')

describe("Get Customer Integration Tests", () => {
    it("Should get a customer by it\'s id", async () =>{
      await createNewCustomer()
      .then(async (res) => {
        const createdCustomer = JSON.parse(res.body)
        const customer = await getCreatedCustomer(createdCustomer.id)
        expect(customer).toBeDefined();
        expect(validators.isApiGatewayResponse(customer)).toBe(true);
      })   
    })
})

const createNewCustomer = async () => {
  const event = eventGenerator({
    body: {
      name: 'Renato',
      city: 'Itajaí'
    }
  });
  return createCustomer.handler(event);
}

const getCreatedCustomer = async (id:String) => {
  const event = eventGenerator({
    pathParametersObject: {
      id
    }
  });
  return getCustomer.handler(event);
}