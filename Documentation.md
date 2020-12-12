
# TEDTALKS BY KARIN 


## BASE URL
https://tedtalks-by-karin.herokuapp.com/


## TALKS
`https://tedtalks-by-karin.herokuapp.com/talks/?page={number of page}`

Listing all talks on pages consisting of 50 talks per page. To query for a specific page, use page={number of page}.

#### Query for talks filtered by following:

**Category (category)** 

`https://tedtalks-by-karin.herokuapp.com/talks/?category={category name}&category={second category name}`

Listing all talks in a selected category. Filtering by multiple categories is possible. When using multiple queries the result will be based on talks containing **all** queries. 


**Speaker (speaker)**

`https://tedtalks-by-karin.herokuapp.com/talks/?speaker={speaker name}`

Listing all talks made by selected speaker.


**Event (event)**

`https://tedtalks-by-karin.herokuapp.com/talks/?event={name of event}`

Listing all talks presented on selected event.


## SINGLE TALK
`https://tedtalks-by-karin.herokuapp.com/talks/{id}`

To list a single talk add the individual ID to the endpoint. 

## SPEAKERS
`https://tedtalks-by-karin.herokuapp.com/speakers/`

Listing all speakers.

## TALKS BY SPEAKER
`https://tedtalks-by-karin.herokuapp.com/speakers/{speaker}/talks`

Listing all talks for chosen speaker.

## EVENTS
`https://tedtalks-by-karin.herokuapp.com/events/`

Listing all events.

## TALKS BY EVENT
`https://tedtalks-by-karin.herokuapp.com/events/{event}/talks`

Listing all talks for chosen event.


----------------------------------------------------------------


##### Dataset source: 
https://www.kaggle.com/rounakbanik/ted-talks
