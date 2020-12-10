
# TEDTALKS BY KARIN 
## An API listing all TED-talks


### BASE URL
https://tedtalks-by-karin.herokuapp.com/


### TALKS
https://tedtalks-by-karin.herokuapp.com/talks/

##### TALK QUERIES
To list talks filtered by following:
- Category (category) 
https://tedtalks-by-karin.herokuapp.com/talks/?category=*{category name}*
    Listing all talks in a selected category.
    Filtering by multiple categories is possible. When using multiple queries the result will be based on talks containing **all** queries.
- Speaker (speaker)
https://tedtalks-by-karin.herokuapp.com/talks/?speaker=*{speaker name}*
    Listing all talks made by selected speaker.
- Event (event)
https://tedtalks-by-karin.herokuapp.com/talks/?event=*{name of event}*
    Listing all talks presented on selected event.


### SINGLE TALK
https://tedtalks-by-karin.herokuapp.com/talks/*{id}*
    To list a single talk add the individual ID to the endpoint. 

### SPEAKERS
https://tedtalks-by-karin.herokuapp.com/speakers/
    Listing all speakers i alphabetical order.

### EVENTS
https://tedtalks-by-karin.herokuapp.com/events/
    Listing all events in alphabetical order.


##### Dataset source: 
https://www.kaggle.com/rounakbanik/ted-talks