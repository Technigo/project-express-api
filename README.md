# Project Express API

An project in Technigos webdev bootcamp, building a API with Express.

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

### Installation and setup

Fork this repository and clone it to your local machine
```javascript
git clone
```

Install dependencys
```javascript
npm install
```

run dev sever using node-mon
```javascript
npm run dev
```

### Usage / Endpoints

Get a random book
```javascript
/books/random
```
Get all books in a specific language
```javascript
/books/language/:lang
```
[Language codes](https://www.loc.gov/marc/languages/language_code.html)

Get all books with in a specific language and with a specific rating
```javascript
/books/language/:lang/rating/:rating
```

get all books with a specific rating
```javascript
/books/rating/:rating
```

get top 10 books
```javascript
/books/top10
```

## View it live

[Live link](https://project-express-api-5igwqikbcq-uc.a.run.app/)
