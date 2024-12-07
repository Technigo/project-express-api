# Project Express API

This project marks the beginning of my backend journey with Express.js, featuring RESTful endpoints that return data from a hard-coded JSON file. 

Array methods like .find(), .filter(), and .slice() are used to manipulate the data. While pre-made datasets are available, I chose to create my own for a personalized touch.

## Requirements:
- The API should have at least 3 routes. 
  - The endpoint "/" should return documentation of your API using e.g. [Express List Endpoints](https://www.npmjs.com/package/express-list-endpoints)
  - A minimum of one endpoint to return a **collection** of results (array of elements).
  - A minimum of one endpoint to return a **single** result (single element).
- Your API should be RESTful.
- You should follow the guidelines on how to write clean code.

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

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

## If I had more time - Stretch goals

### Intermediate Stretch Goals
- On routes which return a single item, handle when the item doesn't exist and return some useful data in the response.

- Accept filters via query parameters to filter the data you return from endpoints which return an array of data.

- Create some empty/dummy endpoints which could contain more complex operations in the future.  Find good names for them (think RESTful).

### Advanced Stretch Goals
- Build a frontend which uses your API in some way to show the data in a nice way (use Vite to get up and running fast).

- If your dataset is large, try implementing 'pages' using `.slice()` to return only a selection of results from the array. You could then use a query parameter to allow the client to ask for the next 'page'.

## View it live

Netlify link
