# Express API Project

This project's goal is to create my first **RESTful API** using **Node in Express** 💪👩‍💻 This API should have a series of **endpoints** which return an array of data or a single object. I worked with a hardcoded dataset in **JSON** format with a list of 500 books and their details. I created the different endpoints by manipulating the data with **JavaScript** methods like: filter(), find() and slice(). I also created a **Frontend** for this project so that I could see my API in action and test it out 🎈 It was a great learning experience having bulit both the Backend and Frontend of a project for the first time. **Find the Frontend for my Bookish API here:** https://vane-bookish-app.netlify.app/ 📚

## Documentation

I've also put together a Documentation Page for this API 🤓, which includes more information about the endpoints, core resources, etc. **Find it here:** https://vane-bookish-app.netlify.app/documentation

## How I built it - What I learned

My first challenge was to determine which dataset to work with. It felt very relevant that the dataset contained enough information in order to come up with good endpoints.

- Since I already had in mind to build a Frontend for this API, I came up with the different endpoints with that vision: what would be cool to show in the Frontend? 🧐
- I managed to implement different endpoints showing results filtered by Author name, single book by book ID, top rated books and quick reads: they are all chosen by either filtering or finding with JavaScript through the original books array extracted from the data.
- It was interesting deciding which ones should be done under a new path name or under an extra query. I approached this by adding a query selector to the searches that are not for exact words or numbers: in my case the search by author endpoint.
- I wanted to push myself some more and decided to implement Pagination to my API since the dataset is so big, it's easier to manipulate the data in smaller chunks. I thought this would also be a cool feature to implement in the Frontend.
- Also learned how to respond with 404 Error messages when a request yields no results. 💥

## View it live

My Bookish API is live in Heroku, you can find it here: https://vane-bookish-api.herokuapp.com/

You can also find the Frontend repository here: https://github.com/VanessaSue27/vane-bookish-api-frontend

And a Live website using this API here - 📕 Vane's Bookish App: https://vane-bookish-app.netlify.app/
