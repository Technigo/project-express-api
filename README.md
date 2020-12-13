# Express API Project

This project is made by me on my 17th week of Technigo Boot Camp. 
It was my first experience with backend development.
The assignment was to create an API using Express and return an array of data and a single item. 

## Documentation

    # Show all data - 
    https://netflix-dummy-data.herokuapp.com/shows

    #Show all by Id -
    https://netflix-dummy-data.herokuapp.com/titles/<title-name>
    example : https://netflix-dummy-data.herokuapp.com/shows/81197050

    # Search Title with search query -
    We can use the query method since several movies/shows can have the same name. We have to /https://netflix-dummy-data.herokuapp.com/shows/title?title=xxx
    example: https://netflix-dummy-data.herokuapp.com/shows/title?title=cho
    
    # Search by Titles -
    https://netflix-dummy-data.herokuapp.com/titles/<title-name>
    example : https://netflix-dummy-data.herokuapp.com/titles/Chocolate

    # Search by Years -
    https://netflix-dummy-data.herokuapp.com/year/<year>
    example : https://netflix-dummy-data.herokuapp.com/year/2001



## The problem

Since the assigment was to return an array of data. For the whole list of shows was no bigger challenge, I just rendered for the data,  but to get out movies from a specific year I had to filter them. 
And to whenever you misspell a title or search for a show that is not in the database I have a '404' message fetch with a conditional 'if-statement'. 

## View it live

https://netflix-dummy-data.herokuapp.com/
