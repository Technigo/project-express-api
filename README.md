# Express API Project

This week I made my own API using Express and the data of Golden Globe nominations 2010-2019 as a weekly project for Technigo bootcamp. 

## The problem

I had problem with query for showing the nominations that won. The problem was that the value of the query `showWon` is read as string, but the original value of the object in the API is boolean value. So I had to change the value of the filtered data into string with `.toString()`, and it solved the problem. 
If I had more time for this project, I would have worked on building the frontend part.

## View it live

https://technigo-express-api.herokuapp.com/
- Here is the documentation for the endpoints and queries.
- To fetch all the nominations: /nominations
- To fetch only limited amount of data: /startpage?page=1&pageSize=50
- use query 'page' for page number and 'pageSize' for the number of objects you want to fetch per page. For example, if you want to see the first page and 50 nominations per page, you can type the url as follow: https://technigo-express-api.herokuapp.com/startpage?page=1&pageSize=50
- To fetch the nominations from a specific year: /nominations/years/:year
- To fetch the nominations that won from a specific year: /nominations/years/:year?won=true
- To fetch the nominations within the category of Best Motion Picture - Foreign Language: /nominations/categories/Best Motion Picture - Foreign Language
- To fetch the nominations within the category of Best Motion Picture from a specific year: /nominations/categories/Best Motion Picture - Foreign Language?year=2020


