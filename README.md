# Project Express API

This project is a RESTful API that provides data for the top 50 tech companies in the US. It was built using Node.js, Express, and JSON data.

# The problem
The main challenge of this project was designing an API that allows users to filter and retrieve data about the top 50 tech companies based on various parameters such as company name, sector, state, and founding year.

# Technologies used:
Node.js
Express
CORS
JSON
Swagger

# Features:
Retrieve data for all top 50 tech companies
Filter companies by sector
Filter companies by name
Filter companies by state
Filter companies by founding year
Filter companies by sector and state
Error handling for invalid routes

# Endpoints:
/ - Index route with a welcome message
/companies - Get data for all companies
/companies/sectors - Get data for companies in different sectors
/companies/:name - Get data for companies by name
/companies/states/:state - Get data for all companies with a HQ in a specified state
/companies/years/:year - Get data for all companies founded in a specified year
/companies/sectors/:sector/:state - Get data for companies in a specified sector with a HQ in a specified state
* - Error route

# How to run the API locally:
Clone the repository
Install dependencies with npm install
Run the server with npm start
Access the API at http://localhost:8081

# The API is also deployed and can be accessed at:
https://project-express-api-cvzekbgn3q-lz.a.run.app/

# API docs can be viewed at:
https://project-express-api-cvzekbgn3q-lz.a.run.app/api-docs/

# Data coming from:
https://www.kaggle.com/datasets/lamiatabassum/top-50-us-tech-companies-2022-2023-dataset