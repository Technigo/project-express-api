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

Describe how you approached to problem: I have enjoyed learning about databases (sql) and data mining in the past and was looking forward to our study of backend. I enjoyed learning about express api and was able to create end points for simple elements, i needed to use some js methods to ensure that the input was the same and made sure I put in some error handling. I got stuck when trying to make some query params. My syntaz was incorrect and require many tries until I was able to write the correct code to create querys for type and continent. Now that I have been sucessdul I;m sure I can set up a backend again.

I was interested in my data and encouraged to try impliment a frontend, I was able to use React Router to do this to make a frontend that the user enteres the airprot ITATA code and it fetches data from my Render deployed backend to display the resutls. I was proud of this acheivement! I have created my frontend in another branch and also created another repo so that I can spend time trying to deploy both backend and frontend successful without distroying my initial project.

How did you plan?: Course content was helpful and I completed the code alongs, planning was straightforward within the server file.

What tools and techniques you used to solve it: Express API...and for my frontend: HTML+CSS, React, JS, React Router, useState, useEffect, useParam hooks

What technologies did you use?: HTML, CSS, JavaScript, React, React Router, React hooks (useState, useParams, useEffect)

If you had more time, what would be next?: I want to get my frontend and backend working together! So I need to spend time working out how to do this.

## View it live

Dataset for Airport codes is from here: https://www.kaggle.com/datasets/joebeachcapital/airport-codes/

I used Render to deploy this project

View it live here: https://project-express-api-hcmb.onrender.com/

You can see my frontend on bec-frontend branch or on my other repo: https://github.com/BeckieMorton/wk13-expressapi-frontandback (I will try to deply this and wanted to make a new repo so that I do not effect my project)
