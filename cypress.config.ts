import { defineConfig } from "cypress";
require('dotenv').config()
import dotenvPlugin from "cypress-dotenv";

module.exports = defineConfig({
  projectId: "g5ecjv",
  e2e: {
    env: { 
      baseUrl: "https://gorest.co.in/public/v2/users", 
    },
    
    setupNodeEvents(on: any, config: any) {
      config.env.api_token = process.env.API_TOKEN
      config = dotenvPlugin(config)
      return config
    },
  },
});
