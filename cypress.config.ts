import { defineConfig } from "cypress";

module.exports = defineConfig({
  projectId: "g5ecjv",
  e2e: {
    env: { 
      baseUrl: "https://gorest.co.in/public/v2/users", 
    },
    
    setupNodeEvents(on: any, config: any) {
    },
  },
});
