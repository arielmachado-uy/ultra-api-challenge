describe("Update user suite", () => {
  let userId: number;

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("json-data/new-user-data").as("newUserData");
    cy.fixture("json-data/update-user-data").as("updateUserData");
    cy.fixture("response-schema/user-response").as("responseSchema");
  });

  afterEach(() => {
    // After the test case is executed the created user is deleted
    cy.deleteUser(userId).then(() => {
      cy.log(`Deleted User ID: ${userId}`);
    });
  });

  it("Create new user - Happy path", function () {
    // Create a new user
    cy.createNewUser(this.newUserData).then((response) => {
      cy.log(`New User ID: ${response.body.id}`);

      // Store the value of the newly created user into a suite variable
      userId = response.body.id;

      cy.updateUser(userId, this.updateUserData).then((response) => {
        // Check the response
        cy.responseValidation(response, 200, this.responseSchema);

        // Checking the newly updated user
        cy.getUserByID(userId).then((response) => {
          cy.checkUserData(this.updateUserData, response.body);

          // Check the response
          cy.responseValidation(response, 200, this.responseSchema);
        });
      });
    });
  });
});
