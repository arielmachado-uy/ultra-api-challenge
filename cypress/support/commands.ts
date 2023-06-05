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
      'Authorization': 'Bearer 75782cb2abeba44a7d1a9f56c587fcadcf617badd6eccceb03ce9c229dbf45b3'
    },
    body: {}
  })
});