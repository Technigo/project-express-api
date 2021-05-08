# Project-brief

In this project an API is built from a local JSON file and used in a simple React/Redux front end app.

# Project description

The user can filter this Netflix data in many different ways. With parameters there are 8 different endpoints: 
- All data
- All Movies
- All TV Series
- A specific movie/tv-series by ID
- A specifi movie/tv-series by Title
//these parameters gives a max-result of 50 objects (5 pages)):
- Recent added data 
- Recent added Movies
- Recent added TV-series


Additional to this, the user can easily narrow down the search by using queries:
- Year (Release year)
- Country of origin
- Genre

The API returns 10 results on each fetch, but the user can easily obtan more by using the page query. By adding a page-number the user can display as many pages as possible on the results obtained.

The front end part of this project displays an easily navigatalble site divided in to:
movies / tv-series 
   -> categories (country, genre)
       -> single category (for example "romantic")
            -> a specific title


### Tech & Tools

Tech: Npm, Nodemon, Babel, node Express, Express Router, React, React Router, Redux, Styled Components <br>
Tools: VS code, Postman, Swagger OpenAPI 3.0, GitHub, Heroku, Netlify, Stack Overflow, Slack


## View it live 
api live-site: 
front-end live-site: https://netflix-api-express.netlify.app

<br>
<br>
<hr>
<br>
<br>



## API Documentation

<a href="https://app.swaggerhub.com/apis-docs/Pauan86/Netflix-express/1.0.3oas3#/media"> Link to the API documentation on Swagger </a>

<body>
  <h1>Netflix test API</h1>
    <div class="app-desc">An API that let's the user search for movies and tv-shows at the time uploaded on Netflix</div>
    <div class="app-desc">More information: <a href="https://helloreverb.com">https://helloreverb.com</a></div>
    <div class="app-desc">Contact Info: <a href="pauline.j.andersson@gmail.com">pauline.j.andersson@gmail.com</a></div>
    <div class="app-desc">Version: 1.0.2-oas3</div>
 <div class="license-info">All rights reserved</div>
    <div class="license-url">http://apache.org/licenses/LICENSE-2.0.html</div>
  <h2>Access</h2>

  <h2><a name="__Methods">Methods</a></h2>
  [ Jump to <a href="#__Models">Models</a> ]

  <h3>Table of Contents </h3>
  <div class="method-summary"></div>
  <h4><a href="#AllMovies">AllMovies</a></h4>
  <ul>
  <li><a href="#moviesGet"><code><span class="http-method">get</span> /movies</code></a></li>
  </ul>
  <h4><a href="#AllNetflixData">AllNetflixData</a></h4>
  <ul>
  <li><a href="#rootGet"><code><span class="http-method">get</span> /</code></a></li>
  </ul>
  <h4><a href="#AllRecentlyAddedMovies">AllRecentlyAddedMovies</a></h4>
  <ul>
  <li><a href="#moviesRecentGet"><code><span class="http-method">get</span> /movies/recent</code></a></li>
  </ul>
  <h4><a href="#AllRecentlyAddedNetflixData">AllRecentlyAddedNetflixData</a></h4>
  <ul>
  <li><a href="#recentGet"><code><span class="http-method">get</span> /recent</code></a></li>
  </ul>
  <h4><a href="#AllRecentlyAddedTVShows">AllRecentlyAddedTVShows</a></h4>
  <ul>
  <li><a href="#tvshowsRecentGet"><code><span class="http-method">get</span> /tvshows/recent</code></a></li>
  </ul>
  <h4><a href="#AllTVShows">AllTVShows</a></h4>
  <ul>
  <li><a href="#tvshowsGet"><code><span class="http-method">get</span> /tvshows</code></a></li>
  </ul>
  <h4><a href="#ObjectById">ObjectById</a></h4>
  <ul>
  <li><a href="#idShowIdGet"><code><span class="http-method">get</span> /id/{show_id}</code></a></li>
  </ul>
  <h4><a href="#ObjectByTitleName">ObjectByTitleName</a></h4>
  <ul>
  <li><a href="#titleTitleGet"><code><span class="http-method">get</span> /title/{title}</code></a></li>
  </ul>

  <h1><a name="AllMovies">AllMovies</a></h1>
  <div class="method"><a name="moviesGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /movies</code></pre></div>
    <div class="method-summary"> (<span class="nickname">moviesGet</span>)</div>
    <div class="method-notes">Obtain all objects with the type &amp;quot;Movie&amp;quot;. Returns 10 per page.</div>
<h3 class="field-label">Query parameters</h3>
    <div class="field-items">
      <div class="param">page (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; The specified page of returned result </div>      <div class="param">year (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects with the specific release year returned </div>      <div class="param">country (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects from the specific country of origin returned </div>      <div class="param">genre (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects listed in the specific genre returned </div>    </div>  <!-- field-items --><h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data     
  </div> <!-- method -->
  <hr/>
  <h1><a name="AllNetflixData">AllNetflixData</a></h1>
  <div class="method"><a name="rootGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /</code></pre></div>
    <div class="method-summary"> (<span class="nickname">rootGet</span>)</div>
    <div class="method-notes">Obtain all the available data. Returns 10 per page.</div>
<h3 class="field-label">Query parameters</h3>
    <div class="field-items">
      <div class="param">page (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; The specified page of returned result </div>      <div class="param">year (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects with the specific release year returned </div>      <div class="param">country (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects from the specific country of origin returned </div>      <div class="param">genre (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects listed in the specific genre returned </div>    </div>  <!-- field-items --><h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li> </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data
        
  </div> <!-- method -->
  <hr/>
  <h1><a name="AllRecentlyAddedMovies">AllRecentlyAddedMovies</a></h1>
  <div class="method"><a name="moviesRecentGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /movies/recent</code></pre></div>
    <div class="method-summary"> (<span class="nickname">moviesRecentGet</span>)</div>
    <div class="method-notes">Obtain all recently added data of the type &amp;quot;Movie&amp;quot;. Returns 10 per page and max 50 in total.</div>
    <h3 class="field-label">Path parameters</h3>
    <div class="field-items">
      <div class="param">recent (required)</div>
           <div class="param-desc"><span class="param-type">Path Parameter</span> &mdash; Returns the most recently added objects </div>    </div>  <!-- field-items --><h3 class="field-label">Query parameters</h3>
    <div class="field-items">
      <div class="param">page (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; The specified page of returned result </div>      <div class="param">year (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects with the specific release year returned </div>      <div class="param">country (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects from the specific country of origin returned </div>      <div class="param">genre (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects listed in the specific genre returned </div>    </div>  <!-- field-items --><h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data
     
  </div> <!-- method -->
  <hr/>
  <h1><a name="AllRecentlyAddedNetflixData">AllRecentlyAddedNetflixData</a></h1>
  <div class="method"><a name="recentGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /recent</code></pre></div>
    <div class="method-summary"> (<span class="nickname">recentGet</span>)</div>
    <div class="method-notes">Obtain all recently added data. Returns 10 per page and max 50 in total.</div>
    <h3 class="field-label">Path parameters</h3>
    <div class="field-items">
      <div class="param">recent (required)</div>
           <div class="param-desc"><span class="param-type">Path Parameter</span> &mdash; Returns the most recently added objects </div>    </div>  <!-- field-items --><h3 class="field-label">Query parameters</h3>
    <div class="field-items">
      <div class="param">page (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; The specified page of returned result </div>      <div class="param">year (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects with the specific release year returned </div>      <div class="param">country (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects from the specific country of origin returned </div>      <div class="param">genre (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects listed in the specific genre returned </div>    </div>  <!-- field-items --><h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data
        
  </div> <!-- method -->
  <hr/>
  <h1><a name="AllRecentlyAddedTVShows">AllRecentlyAddedTVShows</a></h1>
  <div class="method"><a name="tvshowsRecentGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /tvshows/recent</code></pre></div>
    <div class="method-summary"> (<span class="nickname">tvshowsRecentGet</span>)</div>
    <div class="method-notes">Obtain all recently added data of the type &amp;quot;TV Show&amp;quot;. Returns 10 per page and max 50 in total.</div>
    <h3 class="field-label">Path parameters</h3>
    <div class="field-items">
      <div class="param">recent (required)</div>
           <div class="param-desc"><span class="param-type">Path Parameter</span> &mdash; Returns the most recently added objects </div>    </div>  <!-- field-items --><h3 class="field-label">Query parameters</h3>
    <div class="field-items">
      <div class="param">page (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; The specified page of returned result </div>      <div class="param">year (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects with the specific release year returned </div>      <div class="param">country (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects from the specific country of origin returned </div>      <div class="param">genre (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects listed in the specific genre returned </div>    </div>  <!-- field-items --><h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data     
  </div> <!-- method -->
  <hr/>
  <h1><a name="AllTVShows">AllTVShows</a></h1>
  <div class="method"><a name="tvshowsGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /tvshows</code></pre></div>
    <div class="method-summary"> (<span class="nickname">tvshowsGet</span>)</div>
    <div class="method-notes">Obtain all objects with the type &amp;quot;TV Show&amp;quot;. Returns 10 per page.</div>
<h3 class="field-label">Query parameters</h3>
    <div class="field-items">
      <div class="param">page (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; The specified page of returned result </div>      <div class="param">year (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects with the specific release year returned </div>      <div class="param">country (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects from the specific country of origin returned </div>      <div class="param">genre (optional)</div>
           <div class="param-desc"><span class="param-type">Query Parameter</span> &mdash; Objects listed in the specific genre returned </div>    </div>  <!-- field-items --><h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data
        
  </div> <!-- method -->
  <hr/>
  <h1><a name="ObjectById">ObjectById</a></h1>
  <div class="method"><a name="idShowIdGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /id/{show_id}</code></pre></div>
    <div class="method-summary"> (<span class="nickname">idShowIdGet</span>)</div>
    <div class="method-notes">Returns a Movie or TV Show that matches a specific id.</div>
    <h3 class="field-label">Path parameters</h3>
    <div class="field-items">
      <div class="param">show_id (required)</div>
           <div class="param-desc"><span class="param-type">Path Parameter</span> &mdash; id of Movie or TV show </div>    </div>  <!-- field-items -->

<h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data
        
  </div> <!-- method -->
  <hr/>
  <h1><a name="ObjectByTitleName">ObjectByTitleName</a></h1>
  <div class="method"><a name="titleTitleGet"></a>
    <div class="method-path">
    <a class="up" href="#__Methods">Up</a>
    <pre class="get"><code class="huge"><span class="http-method">get</span> /title/{title}</code></pre></div>
    <div class="method-summary"> (<span class="nickname">titleTitleGet</span>)</div>
    <div class="method-notes">Returns a Movie or TV Show that includes the specified title. Should be written without spaces.</div>
    <h3 class="field-label">Path parameters</h3>
    <div class="field-items">
      <div class="param">title (required)</div>
           <div class="param-desc"><span class="param-type">Path Parameter</span> &mdash; Title of Movie or TV show </div>    </div>  <!-- field-items -->

<h3 class="field-label">Return type</h3>
    <div class="return-type">
      array[<a href="#media">media</a>]
   </div>
    <!--Todo: process Response Object and its headers, schema, examples -->
    <h3 class="field-label">Example data</h3>
    <div class="example-data-content-type">Content-Type: application/json</div>
    <pre class="example"><code>[ {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
}, {
  "listed_in" : "Korean TV Shows, Romantic TV Shows",
  "duration" : "1 season",
  "country" : "Japan",
  "date_added" : "November 30, 2019",
  "cast" : "Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo",
  "show_id" : 81193313,
  "director" : "Abhishek Sharma",
  "release_year" : 2019,
  "rating" : "TV-14",
  "description" : "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
  "type" : "Movie",
  "title" : "Chocolate"
} ]</code></pre>
    <h3 class="field-label">Produces</h3>
    This API call produces the following media types according to the <span class="header">Accept</span> request header;
    the media type will be conveyed by the <span class="header">Content-Type</span> response header.
    <ul>
      <li><code>application/json</code></li>
    </ul>
    <h3 class="field-label">Responses</h3>
    <h4 class="field-label">200</h4>
    Successfull pull of netflix data
        
  </div> <!-- method -->
  <hr/>

  <h2><a name="__Models">Models</a></h2>
  [ Jump to <a href="#__Methods">Methods</a> ]

  <h3>Table of Contents</h3>
  <ol>
    <li><a href="#media"><code>media</code></a></li>
  </ol>

  <div class="model">
    <h3><a name="media"><code>media</code></a> <a class="up" href="#__Models">Up</a></h3>
 <div class="field-items">
      <div class="param">type (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Movie</span></div>
<div class="param">show_id (optional)</div><div class="param-desc"><span class="param-type"><a href="#integer">Integer</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: 81193313</span></div>
<div class="param">title (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Chocolate</span></div>
<div class="param">listed_in (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Korean TV Shows, Romantic TV Shows</span></div>
<div class="param">duration (optional)</div><div class="param-desc"><span class="param-type"><a href="#object">Object</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: 1 season</span></div>
<div class="param">country (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Japan</span></div>
<div class="param">date_added (optional)</div><div class="param-desc"><span class="param-type"><a href="#object">Object</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: November 30, 2019</span></div>
<div class="param">release_year (optional)</div><div class="param-desc"><span class="param-type"><a href="#integer">Integer</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: 2019</span></div>
<div class="param">rating (optional)</div><div class="param-desc"><span class="param-type"><a href="#object">Object</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: TV-14</span></div>
<div class="param">description (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.</span></div>
<div class="param">director (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Abhishek Sharma</span></div>
<div class="param">cast (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>
          <div class="param-desc"><span class="param-type">example: Sambasa Nzeribe, Segun Arinze, Tokunbo Idowu, Femi Adebayo</span></div>
    </div>  <!-- field-items -->
  </div>
  </body>