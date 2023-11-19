# Project Express API

This project is a simple Express API that serves music data. It includes functionality to search for music by artist name.

## Backend Explanation

Express.js Role

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. In the context of this project, Express.js serves as the backend framework responsible for handling HTTP requests, defining routes, and managing the communication between the client (front end) and the data source.

### Key Roles of Express.js in this Project:

#### Routing: 

Express defines routes that map to different endpoints of the API. For example, the /music/artist route is used for searching music by artist name.

#### Request Handling: 
When a client sends a request to the API, Express handles that request. In the provided code, there are routes for the root (/) and for fetching music data (/music/artist). The response is then sent back to the client.

#### Middleware: 

Express uses middleware functions to perform various tasks during the request-response cycle. In this project, cors middleware is used to handle Cross-Origin Resource Sharing, allowing the API to be accessed by clients from different origins.

#### JSON Parsing: 
The express.json() middleware is used to parse incoming requests with JSON payloads. This is essential for handling JSON data, which is common in API interactions.

## Running the Project

#### Forking or Cloning the Repository

1. Fork the Repository (if not already done):

    - If you haven't already, go to the GitHub page of the repository you want to clone.
    - Click on the "Fork" button in the top right corner of the page.
    - This will create a copy of the repository in your GitHub account.

2. Clone the Repository:

    - Open your terminal.

    - Navigate to the directory where you want to store the project.

    - Run the following command to clone the repository:

    ```
    git clone https://github.com/stenlisuryadinata/project-express-api.git
    ```

    - Replace your-username with your actual GitHub username.

    - Change into the project directory:
    ```
    bash
    cd project-express-api
    ```
3. Install Dependencies:

    - Install project dependencies using npm:
    ```
    bash
    npm install
    ```

### Backend: Serving Documentation Endpoint

1. Install express-list-endpoints:

```
bash
npm install express-list-endpoints
```
2. Start the Server:

```
bash
npm start
```
If you are using nodemon, you can run it with:

```
bash
npx nodemon server.js
```

3. Access Documentation Endpoint:

Visit http://localhost:8080/ in your browser to access the documentation endpoint and get information about available routes.

### Frontend: Building a Frontend with React

1. Create React App:

```
bash
npx create-react-app music-frontend
cd music-frontend
```

2. Install Axios:

```
bash
npm install axios
```

3. Run Backend Server:

In a new terminal, run your backend server:

```
bash
npm run dev
```

4. Run React App:

In another terminal, run your React app:

```
bash
npm start
```

5. Visit the React App:

Visit http://localhost:3000 in your browser to see the React app. Now, you have a basic frontend that interacts with your API.

## View it live
The project can be deployed to a hosting service like Google Cloud,Heroku, Render, Vercel, etc. and the live version of the API can be accessed at the provided deployment URL.

Backend
- The endpoint "/" return documentation of the API using Express List Endpoints
[Express List Endpoints](https://music-app-405314.et.r.appspot.com/)
- A minimum of one endpoint to return a **collection** of results (array of elements)
[A collection of results Endpoints](https://music-app-405314.et.r.appspot.com/music)
- A minimum of one endpoint to return a **single** result (single element).
[A single results Endpoints](https://music-app-405314.et.r.appspot.com/music)
- Accept filters via query parameters to filter the data you return from endpoints which return an array of data
[query parameters to filter](https://music-app-405314.et.r.appspot.com/music/?search=popularity%3E76)


Frontend
[Music-Search-App](https://6556eba071ab244cd6f23b49--stunning-banoffee-a497ff.netlify.app/)

Feel free to explore the code and modify it as needed for your specific requirements. If you have any questions or need further assistance, please don't hesitate to ask!