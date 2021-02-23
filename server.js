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



