# Spotify Releases API

The purpose of this project was to create a API using Express. The API had to contain a couple of RESTful endpoints returning either an array of data or a single item.

## The problem

Since we are not using databases yet, I decided to re-use a hard-coded set of data used in a previous project, containing a list of 50 Spotify releases.
I first created a /releases route returning an array of releases.
Then I created a /release/:id route returning a single release with a specified id.
I challenged myself a bit more and created additional endpoints returning releases for a specified artist or for a specified market and type. I even added some query params in my initial endpoint in order to filter the result with a part of the artist name or of the title.
Then I created some more informative endpoints that will return all available types, artists, titles and markets.
At last I created some dummy endpoints that could be useful with a bigger dataset.

If I had more time, I would have created some documentation and sliced the data in different pages. I would even have rebuit the music releases project using different endpoints in my API. 

## View it live

You can take a look at the result on https://spotify-releases.herokuapp.com/
You are welcome to visit my pull request https://github.com/Technigo/project-express-api/pull/122 and leave some comments about my code.
Enjoy!
