describe("Negative Scenarios - Wrong Data", () => {

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("response-schema/empty-fields-response").as("emptyResponseSchema");
    cy.fixture("response-schema/value-errors-response").as("errorsResponseSchema");
  })

  it("Create new user - Empty fields", function () {
    let userNoValues = {
      "name": "",
      "email": "",
      "gender": "",
      "status": ""
  }

    // Create a new user
    cy.createNewUser(userNoValues)
    .then(response => {

      // Response validation
      cy.responseValidation(response, 422, this.emptyResponseSchema);

      // Validate error message
      expect(response.body[0].field).to.be.eq("email");
      expect(response.body[0].message).to.be.eq("can't be blank");

      expect(response.body[1].field).to.be.eq("name");
      expect(response.body[1].message).to.be.eq("can't be blank");

      expect(response.body[2].field).to.be.eq("gender");
      expect(response.body[2].message).to.be.eq("can't be blank, can be male of female");

      expect(response.body[3].field).to.be.eq("status");
      expect(response.body[3].message).to.be.eq("can't be blank");
    })
   })

   it("Create new user - Value fields errors", function () {
    let userValueErrors = {
      "name": "Ariel Machado",
      "email": "ariel@machado.com",
      "gender": "something",
      "status": "else"
  }

    // Create a new user
    cy.createNewUser(userValueErrors)
    .then(response => {

      // Response validation
      cy.responseValidation(response, 422, this.errorsResponseSchema);

      // Validate error message
      expect(response.body[0].field).to.be.eq("gender");
      expect(response.body[0].message).to.be.eq("can't be blank, can be male of female");

      expect(response.body[1].field).to.be.eq("status");
      expect(response.body[1].message).to.be.eq("can't be blank");

      expect(response.body[2].field).to.be.eq("email");
      expect(response.body[2].message).to.be.eq("has already been taken");
    })
   })
})