# Express API Project


This is my first venture into the Backend: I used express to build an API with hard-coded data and established several REST-ful end-points.
## The problem

I firstly created my own Nobel Prize-based json data by using Kaggle.com to find an appropriate dataset and then converting the csv data into Json. Using Express, I used this data and created several end points to return arrays of data, and one endpoint to return a single data point -with the surname- as a path parameter. I then created a simple Frontend which fetches the whole list of winners and returns as a single card for each winner. One can then click on the category and this links to another endpoint which fetches all of the winners in that particular category.
If I had more time, I would make the year another link, where one could show all winners in that particular year.



## View it live

The backend can be viewed here...
https://kh-nobelprize-api.herokuapp.com/


The front-end can be viewed here....

https://karas-nobelprize-frontend.netlify.app/

