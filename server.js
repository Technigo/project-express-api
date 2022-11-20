import express, { response } from "express";
import cors from "cors";
import avocadoSalesData from "./data/avocado-sales.json";

// console.log(`Langden anna: ${avocadoSalesData.length}`)

// Defines the port the app will run on. 
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("res", req);
  res.json({responseMessage: "Avocados!"});
});

// This returns the whole dataset
app.get("/avocadoSales", (req, res) => {
  res.json(avocadoSalesData)
});

// this returns an array with all sales objects for a specific date
app.get("/avocadoSales/:date", (req, res) => {
  const date = req.params.date;
  const dateSale = avocadoSalesData.filter((item) => item.date === date)

  if (dateSale.length = 0) {
    res.status(404).json({
      success: false, 
      message: "No sales data for that date.", 
      body: {}
    });
  } else {
    res.status(200).json({
      success: true, 
      message: "OK", 
      body: {
        avocadoSalesData: dateSale
      }
    });
  }
})

// this returns the highest average price 

// app.get("/avocadoSales/highestPrice", (req, res) => {
//   const price 
// });

// app.get("/avocadoSales", (req, res) => {
//   const { name, role } = req.query;
//   let members = technigoMembers;

//   // you could skip {} and return if the sentence below is on one line
//   if (role) {
//     members = members.filter(sinlgeTechnigoMember => {return sinlgeTechnigoMember.role.toLowerCase() === role.toLowerCase()});
//   };

//   if (name) {
//     members = members.filter(singleTechnigoMember => {return  singleTechnigoMember.name.toLowerCase()})
//   }

//   res.status(200).json({
//     success: true, 
//     message: "OK", 
//     body: {
//       technigoMembers: members
//     }
//   });
// });

// app.get("/members/:id", (req, res) => {
//   const singleMember = technigoMembers.find((item) => {
//     all of these works the same
//     return item.id === Number(req.params.id);
//     return item.id === +request.params.id;
//     return item.id.toString === request.params.id;
//     return item.id == request.params.id;
//   });
//   if (singleMember) {
//   res.status(200).json({
//     success: true, 
//     message: "OK", 
//     body: {
//       members: singleMember
//     }
//   });
//   } else {
//     res.status(404).json({
//       success: false, 
//       message: "Not found", 
//       body: {}
//     });
//   }

// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
