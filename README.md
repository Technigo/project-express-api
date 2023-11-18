# Project Express API

I started my backend journey here by creating an API using Express. My API has several  RESTful endpoints which return either an array of data or a single item.

Choosing a dataset: I used Kaggle to find my dataset (airport codes) and then CVSJson.com to convert the csv file to json. It was a large file so I used excel first to delete all airports WITHOUT a IATA code. this gave me a json file with an array of just under 10,000 objects.

My endpoints include:
"path": "/",
"path": "/airports",
"path": "/airports/country/:iso_country",
"path": "/airports/type/:type",
"path": "/airports/iata/:iata_code",
"path": "/airports/name/:name",
  
query params for ?type and ?continent
"path": "/air", eg. /air?type=closed&continent=oc

## The problem

Describe how you approached to problem: 

How did you plan?: 

What tools and techniques you used to solve it: 

What technologies did you use?: 

If you had more time, what would be next?:

## View it live

Dataset for Airport codes is from here: https://www.kaggle.com/datasets/joebeachcapital/airport-codes/

I used Render to deploy this project

View it live here: https://project-express-api-hcmb.onrender.com/

You can see my frontend on bec-frontend branch
