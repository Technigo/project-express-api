# Project Express API
This week we built an API in Node using Express. We used a hard-coded JSON dataset and created routes with app.get() with status codes, and used .filter() method to select the data returned in our responses. 

## The problem
I had an issue with .filter() method returning items with multiple keywords, like if I filtered category of movie/TV show on Reality TV it would only return the items that were only Reality TV and not Reality TV and Horror, or if I filtered on actor name it would not be displayed since multiple actors. This I solved fast with .includes() method with help from team and StackOverflow.

## View it live

https://express-api-w17.herokuapp.com/
