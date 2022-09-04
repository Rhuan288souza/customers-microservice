export {}

const createCustomer = require ('../src/handlers/createCustomer')
const eventGenerator = require('./testUtils/eventGenerator')
const validators = require('./testUtils/validators')

describe("Create Customer Integration Tests", () => {
    it("Should create a new customer", async () => {
        const event = eventGenerator({
            body: {
                name: 'Rhuan',
                phone: '889878899'
            }
        });

        const res = await createCustomer.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    })
})