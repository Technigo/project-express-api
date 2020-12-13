# Golden Globe Express API Project

An API for getting the last ten years Golden Globe nominees.

## Available endpoints

The API comes with a few pre-configured endpoints. They are listed with a brief explanation below.

---

` / `

Root endpoint.

---

` /nominees `

Lists all nominees for the last 10 years.

---

` /nominees/search `

Search for a nominee. Case-insensitive.

*Example URL: /nominees/search?search=leo*

---

` /nominees/winners `

Lists all the Golden Globe winners between 2010-2020.

---

` /nominees/:year `

Lists all nominees for a given year (2010-2020).

*Example URL: /nominees/2017

---

` /nominees/:year/winners `

Lists all winners for a year.
*/nominees/2014/winners*

---

` /nominees/categories/:category `

Lists all nominees for a given category.

*Example URL: /nominees/categories/Best%20Motion%20Picture%20-%20Drama*

---

` /nominees/categories/:category/winners `

Lists all winners for a given category.

*Example URL: /nominees/categories/Best%20Motion%20Picture%20-%20Drama/winners*

---

` /nominees/:category/:year/winner `

Lists the winner of a category for a given year.

*Example URL: /nominees/Best%20Performance%20by%20an%20Actor%20in%20a%20Supporting%20Role%20in%20any%20Motion%20Picture/2015/winner*

---

## The problem

Had a huuuge knowledge gap when starting to tackle this project, but I went back and re-watched the video lectures on Monday and Wednesday, plus reading through this week's reading material. That helped me grok the basics, core functionality, how to structure the endpoint, some filtering functions, etc.

When writing the search endpoint I ran into an incredibly annoying issue with the data, where I tried to do an "includes()" on all of the ~1,000 "nominees" string entries. Turned out that *one* of the nominees entries was a number – the movie '1917' – which caused the filtering to break, and it took me too long to figure out why. Thanks, Sam Mendes.

## View it live

## [https://golden-globe-api.herokuapp.com/](https://golden-globe-api.herokuapp.com/)
