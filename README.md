# Express API Project

First backend by creating an API using express. APIn is build with restful endpoints which return array of data or single item.

## The problem

Technologies:

- install and setup an Express server
- deploy Node projects
- build an API in Node using Express
- create routes in Express
- data manipulation in JavaScript - selecting, filtering, and limiting arrays

Build up different endpoints to the netflix-titles.json.
Documentaion of endpoints:

The nameless-stream-30791 REST API demonstrates an API to fetch Netflix-movie data.

Endpoint all data. Collect all data from different netflix- titles.
GET https://nameless-stream-30791.herokuapp.com/

    {
        "show_id": 81193313,
        "title": "Chocolate",
        "director": "",
        "cast": "Ha Ji-won, Yoon Kye-sang, Jang Seung-jo, Kang Bu-ja, Lee Jae-ryong, Min Jin-woong, Kim Won-hae, Yoo Teo",
        "country": "South Korea",
        "date_added": "November 30, 2019",
        "release_year": 2019,
        "rating": "TV-14",
        "duration": "1 Season",
        "listed_in": "International TV Shows, Korean TV Shows, Romantic TV Shows",
        "description": "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
        "type": "TV Show"
    }

GET https://nameless-stream-30791.herokuapp.com/titles/
Collects the titles for the movie

[ "Chocolate",
"Guatemala: Heart of the Mayan World",
"The Zoya Factor",
"Atlantics",
"Chip and Potato",
"Crazy people",
"I Lost My Body",
"Kalushi: The Story of Solomon Mahlangu",
]

GET https://nameless-stream-30791.herokuapp.com/titles/?title={name or part of name of movie}
example: car
[
"Carriers",
"Carmen Sandiego",
"Fastest Car",
"Care of Kancharapalem",
"CAROLE & TUESDAY",
"Apache: The Life of Carlos Tevez",
"Care Bears: Welcome to Care-a-Lot",
"Comedians in Cars Getting Coffee",
"Scare Tactics",
"Girls Incarcerated",
"Cop Car",
"Carrie"
]

GET https://nameless-stream-30791.herokuapp.com/year/{year}
Chose from what year you want to collect Netflix-titles from

## View it live

Heroku backend: https://nameless-stream-30791.herokuapp.com/

Want to try it out? This is the a front end that could be used to search for titles and year:
ajliin-first-backend.netlify.app
