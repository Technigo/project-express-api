# Weekly project for Technigo's bootcamp, week 17
Task: build an API with Express

Tech: JavaScript, API, Node.js, Express

----

# Week 17: Project Express API

This week's project was to create an API using Express with RESTful endpoints.

## The problem

This first project with backend was very easy in my opinion, I had no trouble to understand what to do and how to do it. However, because of that, I had an ambitious (too amitious) plan at first for which I created my own dataset. By lack of time to build the nice frontend for which this dataset was created, I had to start over with an already made dataset, and I decided to make it quite simple and to leave out the optional frontend. I had an issue with filtering the properties with boolean values but with lots of thinking/googling/asking for help, I made it work.

Endpoints (can all be combined with query parameter: **page=page**):
* "**/**": Documentation,
* "**/endpoints**": All endpoints
* "**/chocolates**": Get all chocolates.
* "**/chocolates/latest_reviews**": Get the chocolates with the latest reviews (>= 2019).
* "**/chocolates/oldest_reviews**": Get the chocolates with the oldest reviews (<= 2006).
* "**/chocolates/best_ratings**": Get the chocolates with the best ratings (>= 4).
* "**/chocolates/worst_ratings**": Get the chocolates with the worst ratings (<= 2).
* "**/chocolates/highest_in_cocoa**": Get the chocolates with the highest percentage of cocoa (>= 90).
* "**/chocolates/lowest_in_cocoa**": Get the chocolates with the lowest percentage of cocoa (<= 55).
* "**/chocolates/most_ingredients**": Get the chocolates with the most ingredients (>= 6).
* "**/chocolates/least_ingredients**": Get the chocolates with the least ingredients (== 1).
* "**/chocolates/without_sweetener**": Get the chocolates without any sweetener (no sugar or other_sweetener).

With path parameters:
* "**/chocolates/name/:name**": Get a chocolate by name.
* "**/chocolates/id/:id**": Get a chocolate by ID.

Many query parameters can be used alone or combined together):
* "**/chocolates?company=string**": "Filter the chocolates from a specific company.",
* "**/chocolates?company_location=string**": "Filter the chocolates from a specific company location.",
* "**/chocolates?review_date=number**": "Filter the chocolates from a specific review date.",
* "**/chocolates?country_of_bean_origin=string**": "Filter the chocolates from a specific country of bean origin.",
* "**/chocolates?count_of_ingredients=number**": "Filter the chocolates with a specific count of ingredients.",
* "**/chocolates?has_cocoa_butter=boolean**": "Filter the chocolates with cocoa butter or not.",
* "**/chocolates?has_vanilla=boolean**": "Filter the chocolates with vanilla or not.",
* "**/chocolates?has_lecithin=boolean**": "Filter the chocolates with lecithin or not.",
* "**/chocolates?has_sugar=boolean**": "Filter the chocolates with sugar or not.",
* "**/chocolates?has_other_sweetener=boolean**": "Filter the chocolates with other sweetener or not.",
* "**/chocolates?first_taste=string**": "Filter the chocolates with a first taste that includes the string.",
* "**/chocolates?second_taste=string**": "Filter the chocolates with a second taste that includes the string.",
* "**/chocolates?third_taste=string**": "Filter the chocolates with a third taste that includes the string.",
* "**/chocolates?fourth_taste=string**": "Filter the chocolates with a fourth taste that includes the string.",
* Combination example: "**/chocolates?company_location=France&review_date=2019&has_vanilla=true**"

## View it live

Project deployed here (link to documentation): [Sweetest API](https://sweetest-api.herokuapp.com/)

All endpoints: https://sweetest-api.herokuapp.com/endpoints
