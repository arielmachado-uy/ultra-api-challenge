# Ultra.io : API Challenge - Extra bonus

## Project: Developing an automated test suite for a dummy API
<br>

### Description: 

The expected outcome is a Postman collection covering the testing of one of the 4 REST API resources available on `https://gorest.co.in/`. <br>
The authentication token for the requests can be generated on `https://gorest.co.in/consumer/login` or on `https://dummy.restapiexample.com/` (as an alternative in case the first one doesn’t work for you)<br>

<br>

You are expected to:

1. Cover as many testing levels and types as possible to make sure your tests are catching all potential critical defects
2. Enable the testing of the provided functionality as part of a CI/CD pipeline (hint: Postman collections can be executed via newman)
3. Describe the chosen API testing approach
4. Provide execution instructions and enough information explaining the final solution
5. An extra bonus is considered developing an automation framework covering the scenarios from the Postman collection

<br>

---
<br>

**Extra bonus**

This project is **ONLY** about the `extra bonus` step where I implemented an automated framework to execute the set of scenarios that are run using Newman and a Postman collection

<br>

**Tech Stack**
- The test cases were automated using Cypress and Typescript
- Current project can be found here: https://github.com/arielmachado-uy/ultra-api-challenge

<br>

**CI/CD implementation**
- The automation project is integrated with github actions for CI/CD
- The automated test case will run after every push to the `main` branch
- The automated test case can be run manually using the github workflow

**Extra:** the automation project is also integrated with `Cypress Cloud` for reporting and debugging purposes

<br>

**Automation implementation**

Project setup

1. Make sure you have Node installed on your system before proceeding with the project (based on your OS)
   - https://nodejs.org/en/download
   - https://formulae.brew.sh/formula/node
2. Checkout the code from the provided url (https://github.com/arielmachado-uy/ultra-web-challenge)
3. Open the project on VS Code
4. Open the terminal and run `yarn` in order to install needed dependencies

<br>
Project execution

- There are 3 scripts in the package.json file to run the scenario in different ways
- `yarn cy:run`
- `yarn cy:open`
- `yarn cy:ci`

<br>

Script `yarn cy:run`
- When running this script, the test case will be executed locally in a headless way
- After the test finishes running, a new video will be stored inside the `videos` folder with a record of the execution (videos are deleted before every new execution)
- In case there was a failure, the framework will take a screenshot of the error and store it inside the `screenshots` folder
- The results of the execution will be displayed like this:

<br>

Script `yarn cy:open`
- When running this script the Cypress Runner will be opened and the tester can utilize it to execute the test case
- When using the runner, the user can navigate back in time and review previous steps and responses
- The user can see the execution of the test inside the runner
- No videos, nor screenshots are stored during this execution
- The user can re-run the test case from the runner without using the script again
- Check the following video to see the execution of the test inside the runner

<br>

Script `yarn cy:ci`
- Use this script to run the test cases in the CI/CD
- This script contains the key to the Cypress Cloud integration
