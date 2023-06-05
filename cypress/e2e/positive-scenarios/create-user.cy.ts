describe("Create new user suite", () => {

  let userId: number;

  beforeEach(() => {
    // Loading data for the new user and storing it in an alias
    cy.fixture("json-data/new-user-data").as("newUserData");
    // Loading data for the response schema and storing it in an alias
    cy.fixture("response-schema/create-user-response").as("newUserResponseSchema");
  })

  afterEach(() => {
    // After the test case is executed the created user is deleted
    cy.deleteUser(userId).then(() => {
      cy.log((`Deleted User ID: ${userId}`));
    });
  })

  it("Create new user - Happy path", function () {
    // Create a new user
    cy.createNewUser(this.newUserData)
    .then(response => {
      cy.log(`New User ID: ${response.body.id}`);
      
      // Store the value of the newly created user into a suite variable
      userId = response.body.id;
      
      // Check the response
      cy.responseValidation(response, 201, this.newUserResponseSchema);

      // Checking the newly created user
      cy.getUserByID(userId)
      .then(response => { 
        cy.checkUserData(this.newUserData, response) 

        // Check the response
        cy.responseValidation(response, 200, this.newUserResponseSchema);
      })
    })
   })
})