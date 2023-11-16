# Instructions
This week's project is to start your backend journey by creating an API using Express. Your API should have at least a couple of RESTful endpoints which return either an array of data or a single item.

Since we're not using databases yet, you'll need to use a hard-coded set of data, stored as a JSON file in your project. The API endpoints you create will use this file along with array methods such as [.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), and [.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) to select, filter, or limit the items returned in your responses.

It's up to you to decide what sort of data you'd like to return from your API endpoints. In the repository, we've included some datasets you can use if you'd like:

- Golden globes nominations 2010-2019 (used in this week's code along)
- 500 book reviews
- Avocado sales and average prices from a selection of US states
- 1375 Netflix titles and some data about them
- 50 popular Spotify tracks and some data about the music type

If you'd like to build your own data set - feel free! You could write it yourself, or find data on a site such as [Kaggle](https://www.kaggle.com/datasets). We used Kaggle to get the datasets above by downloading CSV files from datasets, renaming columns to be more JSON friendly, and then using a service to [convert from CSV to JSON](https://www.csvjson.com/csv2json).

## Example routes
RESTful routing can take a little time to get used to. Try to think of what the plural term for your data is and use that as a starting point. For example, if you're building an API using the Spotify data in the repo, each item in the data is a track - or song. So a pluralized route for this would be `/songs`. Your routes could then look like this:

`/songs` - Returns an array of songs

`/songs/5` - Returns a single song whose ID is '5'

## Requirements:
- Your API should have at least 3 routes. Try to push yourself to do more, though!
  - The endpoint "/" should return documentation of your API using e.g. [Express List Endpoints](https://www.npmjs.com/package/express-list-endpoints)
  - A minimum of one endpoint to return a **collection** of results (array of elements).
  - A minimum of one endpoint to return a **single** result (single element).
- Your API should be [RESTful](https://www.notion.so/23473abe980e40aaa932914751055d22?pvs=21).


## Stretch goals
So you’ve completed the requirements? Great job! Make sure you've committed and pushed a version of your project before starting on the stretch goals. Remember that the stretch goals are optional.

### Intermediate Stretch Goals
- On routes which return a single item, handle when the item doesn't exist and return some useful data in the response.

- Accept filters via query parameters to filter the data you return from endpoints which return an array of data.

- Create some empty/dummy endpoints which could contain more complex operations in the future.  Find good names for them (think RESTful).

### Advanced Stretch Goals
- Build a frontend which uses your API in some way to show the data in a nice way (use the [react-starter](https://github.com/Technigo/react-starter) template to get up and running fast).

- If your dataset is large, try implementing 'pages' using `.slice()` to return only a selection of results from the array. You could then use a query parameter to allow the client to ask for the next 'page'.
