# Project Express API

This project is an Express-based RESTful API that provides endpoints to interact with a dataset of Netflix-like movie and TV show titles. The API allows users to retrieve information about movies and TV shows based on various criteria, such as ID, title, or release year. It is designed to be flexible and easy to use, with endpoints for retrieving collections of results and single elements.

## The problem

The main problem encountered was related to designing an Express.js API to handle various endpoints, where issues arose in filtering movies by certain criteria like title, type, or release year. The common issues included:

Incorrect Filtering Logic: The filtering did not always work as expected, leading to either too many results or none at all.
Case Sensitivity: Differences in letter casing led to incorrect comparisons, affecting the accuracy of filtering.
Parameter Extraction: Problems extracting query parameters or path parameters caused routes to return unexpected results.

## View it live

https://project-express-api-1-6dk3.onrender.com
