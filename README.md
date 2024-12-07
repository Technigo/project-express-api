# Project Express API

This project marks the beginning of my backend journey with Express.js, featuring RESTful endpoints that return data from a hard-coded JSON file. 

Array methods like .find(), .filter(), and .slice() are used to manipulate the data. While pre-made datasets are available, I chose to create my own for a personalized touch.

## Requirements:  
  1. The API should have at least 3 routes.  
    This API has the following routes:  
    - /: Returns documentation of the API using express-list-endpoints.[Express List Endpoints](https://www.npmjs.com/package/express-list-endpoints).   
    - /elves:  
    - /elves/:id:  
    - /elves/title/:title:  
  2. A minimum of one endpoint to return a **collection** of results (array of elements).  
    - /elves: Returns a collection of elves, with optional filtering by query parameter (?title=).  
    - /elves/title/:title: Returns elves by their title using a path parameter.  
  3. A minimum of one endpoint to return a **single** result (single element).  
    - /elves/:id: Returns a single elf by ID.  
  4. Your API should be RESTful.  
    - Routes (elves) are defined with endpoints such as /elves, /elves/:id, and /elves/title/:title.  
    - HTTP methods are used (GET).  
    - Responses are structured in JSON format.  
  5. You should follow the guidelines on how to write clean code.  
    - Variable names are clear and descriptive (e.g. request, response, title).  
    - Each functionality is separated into its own endpoint. 
    - express.json() and cors() to handle JSON parsing and CORS issues  

## Dependency Installation & Startup Development Server
This project uses npm (Node Package Manager) and Express.js to manage dependencies and run the development server. Follow these steps to get started:  
  1. Install Project Dependencies  
  Run the following commands to install necessary packages and set up the development environment:  
    ```bash
    npm install
    npm run dev
    npm run build
    ```  
  2. If Express.js is not already installed, initialize your project and install it:  
    ```bash
    npm init -y
    npm install express
    ```  
  3. Start your server  
  Launch the server:
    ```bash
    node server.js
    ```  
  4. The package used to generate a list of all available API endpoints automatically (shown on the endpoint /). Install it with:  
  ```bash
  npm install express-list-endpoints
  ```  
  
## The problem  
This was my first backend project, and I found it a bit confusing to figure out what to install and why. I’m also not used to working without a UI, which made it tricky to test everything properly without clickable links or visual "feedback". 

## If I had more time - Stretch goals

### Intermediate Stretch Goals
- On routes which return a single item, handle when the item doesn't exist and return some useful data in the response.

- Accept filters via query parameters to filter the data you return from endpoints which return an array of data.

- Create some empty/dummy endpoints which could contain more complex operations in the future.  Find good names for them (think RESTful).

### Advanced Stretch Goals
- Build a frontend which uses your API in some way to show the data in a nice way (use Vite to get up and running fast).

- If your dataset is large, try implementing 'pages' using `.slice()` to return only a selection of results from the array. You could then use a query parameter to allow the client to ask for the next 'page'.

## View it live

[Check out the Elf's API here!](https://project-express-api-gyq9.onrender.com/)
