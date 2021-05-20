# Express API Project

For this week I created an API with my dataset collected of Kaggle.

This data has all the best artworks of all the time with images per artist. 

## The problem

The database that I chose has around 7.000 images and the problem for this project was how to show that image. To solve that I used standard methods of express to set the path of the images. 

The final result was that I can access the images using this path:

https://best-artworks-of-all-time.herokuapp.com/ >> this is the live database

/image-directory/ >>> this is the path set in the server.

Albrecht_Dürer_3.jpg >>> this is the name of the image, each image has the name of the artist + number of the image. 

the final address to access to each image is : https://best-artworks-of-all-time.herokuapp.com/image-directory/Albrecht_Dürer_3.jpg.


## View it live

To access to the main data you can use this link https://best-artworks-of-all-time.herokuapp.com/artists, also you can filter by nationality or genre adding the following path:

/nationality >> to filter a specific nationality
/all >> to show all nationalities.

/genre/ to filter a specific genre.
/all >> to show all genre. 

Examples of possible filters:

https://best-artworks-of-all-time.herokuapp.com/artists/italian/all >> to show all the artists with nationality "italian" different genres 
https://best-artworks-of-all-time.herokuapp.com/artists/all/expressionism >> to show all the artist available in a specific genre

