# Express API Project

This weeks project was about creating my first API using Node.js and Express. My API consists of data based on a dataset from Kaggle, displaying a list of about 2500 TED-talks.

## The problem

I started by get the server up and running, trying out the app.send and app.json commands. Then I went to Kaggle to try to find a dataset that allowed me to sort on multiple endpoints and also have the possibility to create a frontend page that would be nice to work with. Since the data was in csv-format, I used an online converter to convert it to json.

After importing it to my server, I started playing around with the data and to plan what endpoints to create. I added an endpoint for all talks, all talks by speaker, event and category. However, after speaking to a classmate, discussing the definition of RESTful, I decided to create endpoints to: 
* List all talks 
* List all events 
* List all speakers and 
* List all categories. 
* I also added queries to filter talks by speaker, event and one or more categories.

With some great help from Maksymilian, I managed to add multiple queries to category, and also actually filter talks by the ones who include the categories queried for. 

I also began creating a frontend page, based on the API, but when using the data I realized that several parts of the data were incorrectly formatted. So, with the help from Van, I created a program that generates a new data-file based on the original data, but with the formats I wanted, and also added a unique slug and ID for each talk. In the end I had to do some additional formatting for the /categories-endpoint, due to troubles with parse and the data formatting, once again.

If I'd have more time I'd love to dive into the data even further and explore related talks, and even how to create some sort of scraper to get access to meta-images for my frontend.


## TECH
* Node.js
* Express
* React/JSX
* Redux
* Styled components


## View it live

Live server/API: https://tedtalks-by-karin.herokuapp.com/
Live frontend demo: https://tedtalks-by-karin.netlify.app/
Frontend repo: https://github.com/karinnordkvist/karinnordkvist-Technigo-16-24-API_Frontend
