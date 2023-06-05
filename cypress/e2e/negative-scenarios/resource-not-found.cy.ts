describe("Negative Scenarios - Resource Not Found", () => {

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("json-data/update-user-data").as("updateUserData");
  })

  it("Get user by ID - Not existing ID", function () {
    cy.getUserByID(123456)
    .then(response => {
      // Validate response
      cy.responseValidation(response, 404);

      // Validate error message
      expect(response.body.message).to.be.eq("Resource not found");
    })
   })

   it("Update user - Not existing ID", function () {
    cy.updateUser(123456, this.updateUserData)
    .then(response => {
      // Validate response
      cy.responseValidation(response, 404);

      // Validate error message
      expect(response.body.message).to.be.eq("Resource not found");
    })
   })

   it("Delete user - Not existing ID", function () {
    cy.deleteUser(123456)
    .then(response => {
      // Validate response
      cy.responseValidation(response, 404);

      // Validate error message
      expect(response.body.message).to.be.eq("Resource not found");
    })
   })
})