# Project Express API
This project marks the initiation of the backend journey, focusing on creating an API using Express. The dataset utilized is Avocado sales.

## Feature
- The "/" endpoint returns all available endpoints.
- Supported methods include GET and POST.
- The dataset features "pages," for example:
https://avocado-sales.onrender.com/avocado-sales?page=2
- Endpoints are accessible by ID, region, and min-max price:
https://avocado-sales.onrender.com/avocado-sales/2
https://avocado-sales.onrender.com/avocado-sales/region/albany
https://avocado-sales.onrender.com/avocado-sales/volume/totalVolume?min=0.88&max=0.9



## The problem
1. At the begnning, the server failed to respond to requests at the "/volume" path to fetch data. It was later realized that another path, "/:id," had already been set up to handle requests by ID. To solve this, a new path, "/volume/totalVolume," was established to fetch data within specified average price ranges (e.g., /avocado-sales/volume/totalVolume?min=1&max=1.5).
   
2. Encountered numerous error messages when attempting to run the server on localhost ports 8080 or 3000. Resolved by identifying and terminating the active processes using the commands `lsof -PiTCP -sTCP:LISTEN` and `kill PID`. Additionally, faced challenges closing the terminal within VSCode; however, the process could be terminated using the Mac terminal. 

## View it live
[Front-End](https://avocado-sales-express.netlify.app/)
[Front-End-Repo](https://github.com/MikoZhu/Express-FrontEnd)
[Back-End](https://avocado-sales.onrender.com/)
