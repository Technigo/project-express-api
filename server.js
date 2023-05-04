import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json"
import ITsalaryData from "./data/IT-salary.json"


// The following defines the port the app will run on. Defaults to 8080,
// but can be overridden when starting the server (if needed). Example command to
// overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here ("req" = request, "res" = response)
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

// Get all Technigo members:
app.get("/developers", (req, res) => {
  let salary = req.query.salary;
  let developers = ITsalaryData;

  if (salary) {
    developers = ITsalaryData.filter((singleDeveloper) => {
      return singleDeveloper.yearly_salary === parseInt(salary);
    });
  } 
  res.send(developers);
});

// Get one specific technigo member:
// app.get("/members/:id", (request, response) => {
//   const { id } = request.params;
//   console.log("id: ", id);
//   const singleMember = technigoMembers.find((member) => {
//     // return member._id == id;
//     return member._id === Number(id);
//     // return member._id.toString() === id;
//     // return member._id === +id; 
//   });
//   if (singleMember) {
//     response.status(200).json({
//       success: true,
//       message: "OK",
//       body: {
//         member: singleMember
//       }
//     });
//   } else {
//     response.status(404).json({
//       success: false,
//       message: "Member not found",
//       body: {}
//     });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
