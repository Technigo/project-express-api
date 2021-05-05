# Express API Project

The purpose of this project was to practise creating a RESTful API using Express.



## The problem

In the project we should add a dataset as a JSON . I got a dataset of nuclear plants in the world from https://www.kaggle.com/liananapalkova/nuclear-power-plants. It came in CSV format and was converted to JSON on https://csvjson.com/. 

## API Documentation
NUCLEAR POWER PLANTS API VERSION 1

This API provides data on nuclear plants and reactors in the world. Here is the description of the dataset from the creator Liana Napalkova: "This dataset combines information from a global dataset developed by Declan Butler of Nature News and the Power Reactor Information System (PRIS), an up-to-date database of nuclear reactors maintained by the International Atomic Energy Agency (IAEA). The locations of nuclear reactors around the world are represented as point features associated with reactor specification and performance history attributes as of March 2012."

Disclaimer: I cannot guarantee that the data is up-to-date. According to information on kaggle.com, the dataset was updated three years ago. This API is for practise purposes and will not be updated.
_____________________________________________________________________________________________________

### Endpoints

The API har several endpoints:

**All power plants and reactors**

https://nuclear-plants-api.herokuapp.com/nuclear-power-plants 

Displays the whole dataset, information on all nuclear power plants and reactors. 

It is possible to filter on country. Add your query like this:
/nuclear-power-plants/?country=FINLAND
You need to type the country in CAPITALS and a part of the name works as well.

**Power plants and reactors by ID**

blabla/nuclear-power-plants/:id
Displays one reactor/power plant that has the ID that matches the one inserted in the end of the URL. The ID is a number from 0 to 275.

**Power plants and reactors by country**
blabla/nuclear-power-plants/countries/:country
Displays all reactors in the chosen country that is inserted in the end of the URL. To write the name of states in a way that matches the API, see this list (link).

## View it live

Use one of these endpoints:

https://nuclear-plants-api.herokuapp.com/nuclear-power-plants

https://nuclear-plants-api.herokuapp.com/nuclear-power-plants/{id}
