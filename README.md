My Nuxt 3 Project

Prerequisites
Ensure you have the following installed:
  Node.js (v14 or higher)
  npm or yarn (package manager)

Installation
  1. npm install or yarn install
  2. Set up environment variables
       Create a .env file in "test-real-smart"
         API_BASE = ""
       Create a .env file in "server"
         TOKEN_SEC=""
         PORT=""
  3. npm run dev or yarn dev
       Navigate to http://localhost:3000 to view the application.

Folder Structure
  - components/: Vue components used in the application.
  - pages/: Vue files that define the routes of the application.
  - stores/: Pinia stores for state management.
  - public/: Static assets and files.
  - nuxt.config.ts: Nuxt configuration file.
