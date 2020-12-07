# Express API Project 📚

The focus for this weeks project is to start learning backend by creating our very first API using Express. 

## The problem/How I solved it 💡
The task was to create an API that would have a couple of RESTful endpoints, which return either an array of data or a single item. Since we're not using databases yet we got a set of hard-coded data stored as a JSON files to use in this project. I decided to use the file with a list of book reviews. 

The API endpoints I've created use the data from this file, along with array methods such as .find(), .filter(), and .slice() to select, filter, or limit the items returned in the responses.

I started out with listing all the books in the data, but then decided to use .slice() to minimize the number of books returned. I've also created routes/endpoints to make it possible for:
- showing one single book based on id,
- showing the top 10 books with highest rating,
- filtering books by author.

## View it live 👩‍💻
Link to deployed project: 
