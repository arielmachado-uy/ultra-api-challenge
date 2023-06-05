import Ajv from "ajv";

declare global {
  namespace Cypress {
    interface Chainable {
      performAPIRequest(url: string, action: string, body?: object): Cypress.Chainable<any>;
      createNewUser(data: object): Cypress.Chainable<any>;
      deleteUser(id: number): Cypress.Chainable<any>;
      responseValidation(response: any, status: number, schema: JSON): Cypress.Chainable<any>;
      getUserByID(id: number): Cypress.Chainable<any>;
      checkUserData(originalData: JSON, retrievedData: JSON): null;
    }
  }
}

Cypress.Commands.add('performAPIRequest', (url: string, action: string, body?: object) => {
    cy.request({
      url: url,
      method: action,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('api_token')
      },
      body: body
    })
});

Cypress.Commands.add('createNewUser', (data: object) => {
 cy.performAPIRequest(Cypress.env('baseUrl'), 'POST', data)
});

Cypress.Commands.add('deleteUser', (id: number) => {
  cy.performAPIRequest(Cypress.env('baseUrl') + `/${id}`, 'DELETE')
 });

 Cypress.Commands.add('getUserByID', (id: number) => {
  cy.performAPIRequest(Cypress.env('baseUrl') + `/${id}`, 'GET')
 });

Cypress.Commands.add('responseValidation', (response: any, status: number, schema: JSON) => {
  // Response status validation
  expect(response.status).to.be.eq(status);

  // Response schema validation
  const ajv = new Ajv({ allErrors: true });
  expect(ajv.validate(schema, response.body)).to.be.true;
 });

 Cypress.Commands.add('checkUserData', (originalData: any, retrievedData: any) => {
  expect(originalData.name).to.be.eq(retrievedData.body.name);
  expect(originalData.email).to.be.eq(retrievedData.body.email);
  expect(originalData.gender).to.be.eq(retrievedData.body.gender);
  expect(originalData.status).to.be.eq(retrievedData.body.status);
 });