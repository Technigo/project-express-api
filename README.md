# Express API Project

This week's assignment was to create our own API using Express and the RESTful approach

## The problem

I created my own dataset inspired by a creative writing project of mine, using a variety of random word, object and number generators I could find online. I then converted the spreadsheet to json format with an online tool.

I use switch statements and their fall-through design to check for synonyms of the statuses each dream location may display. I also used fetching from another API, Big Huge Thesaurus (https://words.bighugelabs.com/site/api), to generate synonyms for the keyword query parameter, allowing the request response to return similar matches, not just exact matches. In practice, though, the performance of this functionality is poor as things stand now, as the API's definition of similar words are quite far-fetched at times.

get it... "far-fetched"?

I'll see myself out.

If I had more time I'd like to implement the ability to search with multiple keywords as a query. I'd also like to make it so the status query gets checked for synonyms the same way the status endpoint/route does, utilizing the same switch statement. I'd also love to implement POST requests, allowing the user to create location entries.

## View it live

//Currently none of the below are working yet as I've run into last-minute build problems :( will fix soon

Heroku build:
https://dreamscape-location-server.herokuapp.com/