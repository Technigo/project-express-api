import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//   bodyParser = require("body-parser"),
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books Express API with Swagger",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Books API",
        url: "https://mary-snopok-books-open-api.herokuapp.com/",
        email: "marysnopok8@gmail.com",
      },
    },
    servers: [
      {
        url: "https://mary-snopok-books-open-api.herokuapp.com/",
      },
    ],
  },
  apis: ["./routes/books.js"],
};

const specs = swaggerJsdoc(options);

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use("/", require("./routes/books"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
