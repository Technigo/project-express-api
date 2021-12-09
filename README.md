# API DOCUMENTATION

GET "/" - filters the list to show the whole list of nominations to the Oscars awards.
There is a query parameter that can be used to show a certain page. Each page consist of 100 nominations. The initial value is ?page=0 which will show the first 100 nominations.

GET "/winners" - filters the list to only show winners.
There is a query parameter which can be used to select a certain category of awards for example:
?category="LEAD ACTOR".

GET "id/:id" - finds the id that matches what the user puts in and shows only this object. If the id written by the user doesnt exist the API will return a error message (404).

GET "/category/:category" - Filters the list and just shows the nominations for the categorys that is put in by the user.

GET "/ceremony/year/:year" - Filters the list and shows the nominations for a certain ceremony year.

GET "/ceremony/number/:number" - Filters the list and shows the nominations for a certain ceremony number.

GET "/winners/:year/:category" - Filters the list and shows the winners of the year and category the user puts in.
