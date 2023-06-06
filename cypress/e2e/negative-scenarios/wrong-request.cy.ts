describe("Negative Scenarios - Wrong Request", () => {
  let userId: number;

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("json-data/new-user-data").as("newUserData");
    cy.fixture("response-schema/wrong-token-response").as("responseSchema");
  });

  it("Create new user - Wrong Token", function () {
    // Create a user using a wrong token
    cy.createNewUserWrongToken(this.newUserData).then((response) => {
      // Response validation
      cy.responseValidation(response, 401, this.responseSchema);

      // Validate error message
      expect(response.body.message).to.be.eq("Invalid token");
    });
  });

  it("Create new user - Wrong Url", function () {
    // Create a user using a wrong API url
    cy.createNewUserWrongUrl(this.newUserData).then((response) => {
      // Response validation
      cy.responseValidation(response, 404);
    });
  });
});
