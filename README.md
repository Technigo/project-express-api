# Express API Project

This is my first project with backend. The project consisted of creating an API using Express.
The API should have at least a couple of RESTful endpoints which return either an array of data,
or a single item.

## The problem

I chose to work with the existing hard coded set of data of top-music.
I started to build my project using app.get() - function with the arguments os request and response to send a response from the backend,
and continuing with the top-music data and displayed the whole array of data.
By installing and importing express-list-endpoints I created a function that shows the various endpoint of path, method and middlewars.
Then I used path params and created a function that returned one item of the array using the id and send a response with status 404 and a text message if the id the user searched for did not exist.
By creating a function using query params I was able to display a filter search for the artist and the track.
If I had more time I would have created some dummy endpoints and built a frontend that used my API to show the data in a nice way.

## View it live

https://express-music-project.herokuapp.com/
