describe("Create New User suite", () => {
  let userId: number;

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("json-data/new-user-data").as("newUserData");
    cy.fixture("response-schema/user-response").as("responseSchema");
    cy.fixture("response-schema/user-list-response").as("responseListSchema");
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

      // Check the response
      cy.responseValidation(response, 201, this.responseSchema);

      // Checking the newly created user
      cy.getUserByID(userId).then((response) => {
        cy.checkUserData(this.newUserData, response.body);

        // Check the response
        cy.responseValidation(response, 200, this.responseSchema);
      });
    });
  });

  it("Create new user and check users list", function () {
    // Create a new user
    cy.createNewUser(this.newUserData).then((response) => {
      cy.log(`New User ID: ${response.body.id}`);

      // Store the value of the newly created user into a suite variable
      userId = response.body.id;
    });

    // Checking the newly created user
    cy.getUsersList().then((response) => {
      // Check the response
      cy.responseValidation(response, 200, this.responseListSchema);

      // Find a user in the list based on the email
      cy.findUserByEmail(response.body, "ariel@machado.com").then((user) => {
        // Check the data entered in the creation step with the one in the list
        cy.checkUserData(this.newUserData, user);
      });
    });
  });
});
