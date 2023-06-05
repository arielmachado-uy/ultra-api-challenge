describe("Users suite - Positive Scenarios", () => {

  beforeEach(() => {

  })

  it("Create new user", function () {
    cy.performAPIRequest()
    .then(response => cy.log(JSON.stringify(response.body)))
   })
})