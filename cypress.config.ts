import { defineConfig } from "cypress";
require('dotenv').config()

module.exports = defineConfig({
  projectId: "g5ecjv",
  e2e: {
    env: { 
      baseUrl: "https://gorest.co.in/public/v2/users"
    },
    
    setupNodeEvents(on: any, config: any) {
      config.env.api_token = process.env.API_TOKEN
      return config
    },
  },
});
