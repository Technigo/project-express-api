# Project Express API

In this project, I was working with an Express Server. 
I created a couple of routes in Express. I practised some data manipulation in JavaScript, like filter and find.  
The data I'm using in this, I've imported project from Kaggle. I converted CSV to JSON and copied my json file to the folder data. 
I am using a data set about gender inequality
 ( https://www.kaggle.com/datasets/gianinamariapetrascu/gender-inequality-index ) 

 Some of the routes you can look for:
 /data - Returns all available data from the data set

 /data/:number from 1-170 for example: /data/4 - Returns a single country according to its rank. Some countries are not available, hence we have less rank numbers than countires in reality. If you choose the number which is not available, you will get an error message "Country not found". 

development/Very high
development/High  
development/Low
 Returns an array of countires, based on the human development. 

 /country/Name of the country, ex.:
 /country/Sweden
 returns a single result, information about the chosen country. 

## The problem

If I had more time, I'd write a rule to ignore capital/lower case letters so it doesn't matter if you write sweden or Sweden.
I would also build a nice frontend web. 

## View it live

Backend: https://project-express-api-uowr37jooq-lz.a.run.app/

Examples of routes:
https://project-express-api-uowr37jooq-lz.a.run.app/data

https://project-express-api-uowr37jooq-lz.a.run.app/data/4

https://project-express-api-uowr37jooq-lz.a.run.app/development/Low

https://project-express-api-uowr37jooq-lz.a.run.app/country/Poland




