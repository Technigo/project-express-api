import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books Express API",
      version: "0.1.0",
      description: "This is a RESTful API application made with Express and documented with Swagger.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mary Snopok",
        url: "https://mary-snopok.com",
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
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
// app.use("/", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
