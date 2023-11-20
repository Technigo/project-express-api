# Movie site

The goal for this week is to use themoviedb.org's API to fetch a list of movies (more on which movies further down), display them on a page, and then link to a movie detail page when you click on the movie.

This time, rather than following designs from a set of images, we'd like you to follow (or even better: improve) the design which we've created in our example app using the same API.

### Context:

 <img src="/src/assets/finished-version.png" alt="Project Example">

   <a href="https://technigo-movies-project.netlify.com/">
    Click here to view sample of this project
  </a>

In this app, we've used the API to fetch popular movies in the US. You are free to choose whatever endpoint you'd like to build up your list. You could do the same as us, or you could, for example, show movies which are currently in the cinema or find movies in a particular genre. It's up to you!

## Using the API

You will need to register an account with themoviedb.org and then register for an API key in order to use the API.

When signing up for an API key, it asks a bunch of questions about what the application is for, but don't worry - we've contacted themoviedb.org and checked that they're OK with you all using the API for this purpose and it's all good in the hood. So, this is what you need to do:

- Signup for [themoviedb.org](https://www.themoviedb.org/account/signup)
- Go to https://www.themoviedb.org/settings/api/request
- Select 'developer' & accept the terms
- Fill in the form requesting an API. You need to select 'Website' in the dropdown and say the use is for Technigo. Like this:
  <img src="/src/assets/api-form-sample.png" alt="Form Example">
- Fill in your personal details.
- Submit the form and you should be approved automatically. Copy the v3 API key from the following page.

With your freshly minted API key, you're now ready to start making API requests. The API is well documented at [developers.themoviedb.org](https://developers.themoviedb.org/3), and if you click through onto an endpoint, there's a 'try it out' tab where you can paste in your API key and run a request to see what you get in response. These are the endpoints we used in our example application:

### Fetching popular movies for the list page

https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page=1 <br />
!!! Don't forget to replace {api_key} with your API key if you copy and paste this.

### Fetching a movie's details

https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US <br />
Don't forget to replace {api_key} with your API key and {movie_id} with the id you get from the url via react-router if you copy and paste this.

### Rendering images from the API

Each movie comes with a 'poster', which looks like a cover you'd find in a DVD, and a 'backdrop' which is more like a screen capture from a scene in the film. In the API response you get for a movie or list of movies, each one has a property for these images, but it looks like this

`"backdrop_path": "/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg",`

That path to the image is incomplete - it needs a full URL.

To get the full URL, we need to decide what size of the image we'd like, and the API has a bunch of options for that. You can find the full list of sizes by loading the API endpoint https://api.themoviedb.org/3/configuration?api_key={api_key} (don't forget to put your API key in place of {api_key}). That response looks something like this:

```json
{
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    "profile_sizes": ["w45", "w185", "h632", "original"],
    "still_sizes": ["w92", "w185", "w300", "original"]
  }
}
```

This means, that for backdrops (for example), we can choose to render the image at 300px wide, 780px, 1280px, or the original image size. You need to construct a URL using the secure_base_url + size + path from the API response.

For example, if we get this in a movie response

`"backdrop_path": "/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg",`

and we want the backdrop at 1280px, we could build up a URL like this:

`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`

The resulting URL would be https://image.tmdb.org/t/p/w1280/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg

You do not need to call the configuration endpoint within your app. Just use the sizes which it returns (shown above) to construct a URL with appropriate image sizes.

### Hints and tips to complete the project

As always, start by sketching out your application - not just thinking about design, but how should it be split into components, and how should your routes look?

In the example application we've linked to for you to follow the design from, it's built using two routes which each has one component as a child (it's up to you if you want to use this approach!):

_Route: `/`, component: `PopularList`_

This route is responsible for the home page. It uses `useEffect` to run an API request to themoviedb.org and fetch popular films in the US, puts them into state using `useState`, and then renders them wrapped in a `Link` from `react-router-dom` to link to the detail page.

_Route: `/movies/:id`, component: `Detail`_

This route expects a movie ID in the URL and is responsible for showing more details about a movie after you click on it. It uses `useParams` from `react-router-dom` to get the `id` from the URL and then passes that into an API call (within `useEffect`) to themoviedb.org to fetch details about a single movie, then puts the response into state using `useState` and finally renders it onto the page.

## Requirements

- Your app should have at least two pages - one showing a list of movies and one showing details
- You should follow the design from our example (but it's ok to change things - just try to make it look nice).
- Adapting to the different viewports


## Stretch Goals

### Intermediate stretch goals

- Show a 'not found' page if you try to visit a movie detail page with an invalid movie ID (so the user has tried to enter an ID themselves, most likely).
  - In this case, when you send a movie detail request with a movie ID which doesn't exist in the API, the API returns with a 404 response. You can use .catch() on your promise to catch this exception and toggle some sort of 'error' state which can be used to show an error page.
- Handle loading states - The API responds quite quickly, but if you're on a slow network then you'd be faced with a black screen until the response comes back. During this time, you could show a loading message or spinner of some sort on the page.
  - Use something like `const [loading, setLoading] = useState(true)` to make it so the page is loading by default, then call `setLoading(false)` once you get the response back from the API.
  - You could also investigate how to handle the loading of images - or show plain text by default and then use CSS to place the image over the text (using absolute positioning). This way, if the images take a long time to load, the user still sees something relevant.

### Advanced stretch goals
- On the homepage where you list popular movies, you could add a dropdown to change the list. For example, you could toggle between popular, upcoming, and new releases.
- When you load a movie, you get a lot of information in the API response, such as a collection it belongs to, genres it has, or the companies involved with producing the film. Each of these has an API endpoint that can be used to fetch more information about that entity. You could use this data to make links from your movie page to another page. Take a look through the documentation and be creative!
Example:
Some movies have a list of production companies. You could iterate over this list and add a link to each production company to your page. Then, when the user clicks the link, they go to another page that loads information about that production company and perhaps a list of films which they’ve produced.







