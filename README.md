# Express API Project

Build my first API with node.js using Express. The requirements are a couple of RESTful endpoints which return either an array of data, or a single item.

## The problem

We're not using databases yet, so we need to store a JSON file in our projects. I decided to make an API about Christmas Recipes (dataset by Gary Broughton from kaggle).
There are 1600 recipes so I got to practice how to use pagination, and created a couple of endpoints.

We can:

- GET all recipes with pagination,
- GET all recipe(s) with author query params and pagination,
- GET data of one specific recipe,
- GET list of all unique authors

To practice if the endpoints are useful I build a frontend to show the data.

## View it live

Heroku (API): https://christmas-recipes.herokuapp.com/ \
Netlify (frontend): https://christmas-recipes.netlify.app/
