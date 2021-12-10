# Express API Project

Backend project using a JSON file to build an API in NODE using Express. The API has a bunch of routes to get to endpoints. The data has been manipulated by filtering and limiting arrays so that different data is displayed depending on the endpoint.

## The problem

I started the project by chosing a json file to work with (Netflix shows) and to create a first endpoint that displays all objects in the json file. I then tried out params to create an endpoint that displays a single object from the JSON file, using the find-method to catch specific object ids. I continued creating more endpoints with params, and then with queries, using the filter method. By using queries I created enpoints to display arrays of objects depending on the title, type of show (tv-series or movie), country, cast and release year. The queries can be combined so that you can get to an endpoint that returns an array of object from a specific country and whose title includes a specific name.
If there are no objects to show but the response from the JSON was successful, it returns an empty array.

If I had more time I would create a frontend webpage to fetch and display the data from the API.

## View it live

https://flix-data.herokuapp.com/
