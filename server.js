import express from 'express'

const app = express();

const users = [
  {id:1 , name: 'Bob' , age:34},
  {id:2 , name: 'Abe' , age:45},
  {id:3 , name: 'Fabbe' , age:12},
  {id:4 , name: 'Kabbe' , age:93},
];

app.get('/', (request, response) => {
  response.send("Hello world")
});

app.get('/users', (request, response) => {
  const { name } = request.query;
  if (name) {
    const filteredUsers = users.filter((user) => user.name === name);
    response.json(filteredUsers);
  } else {
    response.json(users);
  }
});

app.get('/users/:id', (request, response) => {
  const { id } = (request.params);
  const user = users.find((user) => user.id === +id)
  response.json(user);
});

app.listen(8080, () => {
  console.log("hello");
});





// import bodyParser from 'body-parser'
// import cors from 'cors'

// import data from './data/netflix-titles.json'

// //   PORT=9000 npm start
// const port = process.env.PORT || 8080
// const app = express()

// app.use(cors())
// app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

// app.get('/year', (req, res) => {
//   res.json(data)
// })
// app.get('/years/:year', (req, res) => {
//   const year = req.params.year
//   const releaseYear = data.filter((item) => item.release_year === +year)

//     res.json(releaseYear)
// })

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`)
// })


