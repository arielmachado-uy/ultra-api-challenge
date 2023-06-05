export {};

declare global {
  namespace Cypress {
    interface Chainable {
      performAPIRequest(): Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add('performAPIRequest', () => {
  cy.request({
    url: Cypress.env('baseUrl'),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cypress.env('api_token')
    },
    body: {}
  })
});