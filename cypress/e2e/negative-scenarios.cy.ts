describe("Users suite - Negative Scenarios", () => {

  beforeEach(() => {

  })

  it("User creation - Repeated email", function () {
    cy.performAPIRequest()
    .then(response => cy.log(JSON.stringify(response.body)))
   })
})