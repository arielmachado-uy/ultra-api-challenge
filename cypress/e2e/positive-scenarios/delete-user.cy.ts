describe("Delete User suite", () => {

  let userId: number;

  beforeEach(() => {
    // Loading data and storing it in an alias
    cy.fixture("json-data/new-user-data").as("newUserData");
  })

  it("Create new user - Happy path", function () {
    // Create a new user
    cy.createNewUser(this.newUserData)
    .then(response => {
      cy.log(`New User ID: ${response.body.id}`);
      
      // Store the value of the newly created user into a suite variable
      userId = response.body.id;
      
      cy.deleteUser(userId).then((response) => {
        cy.log((`Deleted User ID: ${userId}`));

        // Check the response
        cy.responseValidation(response, 204);
      });
    })
   })
})