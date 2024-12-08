# Project Express API


We had to create or own API using Epress.js, we were given a boilerplate to start with, the goal was to creat a RESTful API that provides data from a JSON file. I used a dataset of books to create endpoints that return all books, a sigle book by ID, and allow filtering and pagination

## The problem

I did first my own data (sleep_health...) just to try, but I decided to go for books.json in case something went wrong I had time to fix it.

We had to use Express.js to build backend server and define routers, CORS to allow cross-origin request, Nodemon for easy development by auto-reloading the server and Express list endpoints to list all available routs for API documentation

also, during development, I encountered the error:
csharp that appeared on the terminal in a red text: [nodemon] app crashed - waiting for file changes before starting...
I asked chatgpt for help and I learned that this happened due to syntax errors, missing dependencies, or referencing undefined variables. 

I had to check the server logs for specific error, installed any missing packages and used npx babel-node server.js to debug issues direclty, I restarted the server after fixes using npm run dev, 

If i had more time Add more I would add ore of the stretch goals such as filtering options. Build a React frontend to consume the API. and Use a database like MongoDB for persistent data storage.


## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
