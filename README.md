# Project Express API

This is a backend project where I've created an API in Node using Express. The API have RESTful endpoints. I've used the dataset of Avocado sales and average prices from a selection of US states, provided by Technigo.

## The problem

In this project we used a hard-coded set of data, stored as a JSON file. 

The API endpoints created use this JSON file along with the array methods .find(), .filter(), and .slice() to select, filter, and limit the items returned in the responses. I used Postman to look at my endpoints with data. 

## View it live

Link to deployed version in google cloud: https://project-express-api-mkauwz3guq-uc.a.run.app

Use these endpoints:
1. Avocado-sales (list of total): /avocado-sales
2. Search by id: /avocado-sales/:id
3. Search by a region: /avocado-sales/region/:region
4. Sorted by average price: /avocado-sales/averagePrice