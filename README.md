My Nuxt 3 Project

Prerequisites
Ensure you have the following installed
  - Node.js (v14 or higher)
  - npm or yarn (package manager)

Installation
  - npm install or yarn install
      - test-real-smart(front-end) and server(backend)
  - Set up environment variables
      - Create a .env file in the test-real-smart
        - API_BASE=""   //  "http://localhost:5000"
      - Create a .env file in the server
        - TOKEN_SEC="" // "secret code"
        - PORT=""  // 5000
        - MONGODB_URI="" // mongodb://127.0.0.1:27017/test-real-smart
  - npm run dev or yarn dev

Folder Structure
  - components/: Vue components used in the application.
  - pages/: Vue files that define the routes of the application.
  - stores/: Pinia stores for state management.
  - public/: Static assets and files.
  - nuxt.config.ts: Nuxt configuration file.
