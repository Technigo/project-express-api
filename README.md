# Project Express API

This project is our first backend project in which we create an API using Express. The API were also supposed to get RESTful endpoints and return either an array of data or a single item.

## The problem

I decided that I wanted to choose a different set of data through Kaggle. Sharks fascinate me so I ended up picking data about shark attacks from around the world. Interesting data to look at, but I at first had a hard time implementing it because there wasn't a clear id. So I therefore started working with the provided netflixData and got that to work. After that I commented it out and tried to do the same with the shark data instead. From what I have seen, the original order seems to somewhat work as an id to pick a single shark attack to display. I later added the endpoints for species and activities but didn't get them to show at all. I used the endpoints '/shark-attacks/species' and 'shark-attacks/activities' but nothing but 404's showed up in the browser which confused me. I then tried to remove '/shark-attacks' and just use '/species' and '/activities' as endpoints, and then it worked just fine.

In '/shark-attacks/:id' you can change ':id' to a number.

In the query param in the 'Year of shark attacks' endpoint, you have the possibility to filter if the shark attacks from the specified year were unprovoked or not. They can be labelled as 'provoked', 'unprovoked' or 'questionable' so there are three alternatives to try out. You can for example try typing in: /shark-attacks/year/2023?type=unprovoked

In /species, please note that the same type of shark can be displayed many times because of how the data is structured. For example you can in the list find: 'white shark', 'white sharks', 'white shark, 3 M' and 'white shark, 3M' etc.

It was interesting to start working a bit with backend. But I thought it was more challenging to troubleshoot when you don't see it in the browser or console in the same way as you're used to. When I got stuck I asked my team mates or chatGPT for help, but also looked some more at the provided material from Technigo.

Link to the dataset Global Shark Attack on Kaggle: https://www.kaggle.com/datasets/mexwell/global-shark-attack/?select=global-shark-attack.csv

## View it live

Please visit: https://shark-attack-express-api.onrender.com
