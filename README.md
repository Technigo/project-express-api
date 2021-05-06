# Express API Project

Replace this readme with your own information about your project.

Start by briefly describing the assignment in a sentence or two. Keep it short and to the point.

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What
technologies did you use? If you had more time, what would be next?

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can
click around and see what it's all about.

## Documentation

#### Endpoints/parameters
<table style="width:100%">
    <tr>
        <th>Option</th>
        <th>Type</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>/</td>
        <td>empty or /</td>
        <td>main page, shows all available data</td>
        <td>https://netflix-data.herokuapp.com/</td>
    </tr>
    <tr>
        <td>movies</td>
         <td>String</td>        
         <td>returns all objects of the type Movie</td>
        <td>https://netflix-data.herokuapp.com/movies</td>
    </tr>
    <tr>
        <td>tvshows</td>
        <td>String</td> 
        <td>returns all objects of the type TV show</td>
        <td>https://netflix-data.herokuapp.com/tvshows</td>
    </tr>
    <tr>
        <td>recent</td>
        <td>String</td> 
        <td>returns 50 objects thats recently added to netflix. Can be added after endpoints /, /movies and /tvshows</td>
        <td>https://netflix-data.herokuapp.com/tvshows/recent</td>
    </tr>
    <tr>
        <td>id</td>
        <td>Integer</td> 
        <td>returns one object with an specific id</td>
        <td>https://netflix-data.herokuapp.com/id/81193313</td>
    </tr>
    <tr>
        <td>title</td>
        <td>String -> Should be written without spaces in lower case.</td> 
        <td>returns one onject with an specific title. </td>
        <td>https://netflix-data.herokuapp.com/id/chocolate</td>
    </tr>
</table>

#### Queries - Can be added on all endpoints.
<table style="width:100%">
    <tr>
        <th>Option</th>
        <th>Type</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>year</td>
        <td>Integer, format: YYYY</td>
        <td>filter data by year</td>
        <td>https://netflix-data.herokuapp.com/movies?year=2019</td>
    </tr>
    <tr>
        <td>genre</td>
        <td>String</td>
        <td>filter data by genre. One object can have several genres, as long as it includes one of the filtered words in genre it will be returned</td>
        <td>https://netflix-data.herokuapp.com/tvshows/recent?genre=romantic</td>
    </tr>
      <tr>
        <td>country</td>
        <td>String</td>
        <td>filter data by country. One object can have several countries, as long as it includes one of the filtered words in country it will be returned</td>
        <td>https://netflix-data.herokuapp.com/tvshows/recent</td>
    </tr>
    <tr>
        <td>page</td>
        <td>Integer</td>
        <td>every page shows 10 objects. If no page is added, page 0 is shown.</td>
        <td>https://netflix-data.herokuapp.com/tvshows?page=2</td>
    </tr>
</table>