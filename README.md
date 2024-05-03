# Project Express API

This is an API with data of women in Nobel Prize (1901-2019). The data can be filtered by year or category, such as peace or literature. They can also be requested by id-number or searched for by name.

## The problem

I started out by looking for interesting datasets at Kaggle, and landed on the Women in Nobel Prize (1901-2019). Since the entries did not have an id, I decided to ask chatGPT to add an id to each entry.

Then I started creating endpoints; an awards-endpoint which shows all of the awards won by women, an ID-endpoint, a year-endpoint and lastly a category-endpoint. Since I wanted to be able to search for e.g. "medicine", I used the .includes method to get the results of "Physiology or Medicine", which is the way the category is represented in the data. It also required the use of .toLowerCase, to be able to compare the params with the data. I also used these methods when creating a query for the name-search. 

Looking forward, I would like to build a frontend that uses the API and shows the data in a nice way. 

## View it live

(https://women-in-nobel-prize.onrender.com)
