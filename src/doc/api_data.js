define({ "api": [
  {
    "type": "get",
    "url": "/v1/movies",
    "title": "Request all movies",
    "name": "GetMovies",
    "group": "Netflix",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>Type for Movies are Movie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "show_id",
            "description": "<p>Id of the Movie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Movie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Name of the director of the Movie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cast",
            "description": "<p>Cast of the Movie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country where the the Movie is created.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_added",
            "description": "<p>Date when the Movie was added.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Netflix"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Request all Netflix items",
    "name": "GetNetflixItems",
    "group": "Netflix",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "none",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Netflix",
            "description": "<p>Movie and Tv show API .</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Netflix"
  }
] });
