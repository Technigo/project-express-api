# project-express-api

This is my first backend project at Technigo. Creating API from row json file and making endpoints. 
I didn't have much issues with making API, yet I got a bit stuck with find()/filter() methods, and finding a way to make query/params works.
The most issue I encountered with this project was deploying backend/frontend.
I created both in one folder, and it was quite confusing as I have never done that before. While I was deploying API with renderer, I got so many errors which I didn't get when I was building API in local host.
So that was really confusing, and I thought that was the problem of settings. So I was changing possible settings options for hours, but it didn't fix. So I looked up package.json and trying to find a solution on google.

I found out that the errors came from my dependencies and their versions. I deleted few of them and degraded my Node (it was the newest version), then it started work. My deploy was ok, yet it got errors. This was from replaceAll(), and it is a new methods,
so under Node 15, doesn't support it. So I changed it replace with regex, and it started to work!! Finally.


If I could do it again, I would work more with error handlings. As my knowdlege of Node.js/express is not much, I could not do a lot of them. So definetly, I would like to add that in the future.

API:https://my-first-api-91k4.onrender.com/
Deployed site:https://nobel-awards.netlify.app/
