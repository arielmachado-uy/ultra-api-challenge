describe("Negative Scenarios - Repeated Email", () => {

  let userId: number;

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("json-data/new-user-data").as("newUserData");
    cy.fixture("response-schema/repeated-email-response").as("responseSchema");
  })

  afterEach(() => {
    // After the test case is executed the created user is deleted
    cy.deleteUser(userId).then(() => {
      cy.log((`Deleted User ID: ${userId}`));
    });
  })

  it("Create new user - Empty fields", function () {
    // Create a new user
    cy.createNewUser(this.newUserData)
    .then(response => { userId = response.body.id })

    // Create a user with the same email
    cy.createNewUser(this.newUserData)
    .then(response => {
      // Response validation
      cy.responseValidation(response, 422, this.responseSchema);

      // Validate error message
      expect(response.body[0].field).to.be.eq("email");
      expect(response.body[0].message).to.be.eq("has already been taken");
    })
   })
})