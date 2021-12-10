# Express API Project

For this project I explore the backend for the first time, by creating an API using Express. The API (containing data about books) has a few RESTful endpoints returning either an array of data, or a single item.

## The problem

I didn't use a database, instead I used a hard-coded set of data, stored as a JSON file.
To create an endpoint to list a single item, a specific book, I used a param and the .find() method to select the item returned in the response.
For the other endpoints, where I list all titles or all authors, I used .map() to map over the array and .sort() to list them in alphabetical order.

If I had more time I would like to experiment going deeper and list more types of data and it would be fun to add a frontend to the project as well.

What I learnt:
- How to install and setup an Express server
- How to deploy Node projects
- How to build an API in Node using Express
- How to create routes in Express
 
## View it live

https://express-deployment-kim.herokuapp.com/

