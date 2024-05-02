# Project Express API

In this weeks introduction to backend we had to create an API using Express and generate a couple of RESTful endpoints to return an array or single item.

## The problem

I generated a json file with horses for sale. I played around with some filters and decided to create the following endpoints:

- "/", API overview
- "/horses", all horses
- "/year/:year", horses born a specific year (query to filter only winning horses available by adding "?won=true")
- "/gender/:gender", horses of a specific gender (query to filter only winning horses available by adding "?won=true")
- "/horses/:horseId", horse by ID

## View it live

https://horses-for-sale.onrender.com/
