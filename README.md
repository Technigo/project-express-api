# Project Express API

This is an API with data of zoo animals. The data can be filtered by type of animal or whether they are predators or not. They can also be requested by id-number or searched for by name.

## The problem

I started this project by looking at Kaggle for an interesting set of data and found one with zoo animals. However, the data it contained was pretty boring, so I decided to make my own data set with the help of chatGPT.

I knew I wanted to be able to filter the data by type of animal, so I created an end-point for that first. Then I added the ID-endpoint and a query to search by name. Lastly I wanted a query that used a boolean value, so I added a query for predators. But, since the query-param is a string I needed to add .toString to the value from the data-set to be able to compare them.

## View it live

https://zoo-animals-express-api.onrender.com/
