describe("POC suite", () => {

  beforeEach(() => {

  })

  it("POC performing an API request", function () {
    cy.performAPIRequest()
    .then(response => cy.log(JSON.stringify(response.body)))
   })
})