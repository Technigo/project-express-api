# My Express API — Books

In this project I created my first API using Express.js. It's a small API without a database that has a fixed amount of data about some books.

## **Endpoints**

### **1. List All Books**

**GET** `/api/books`

Retrieves all books in the database. Supports filtering and sorting through query parameters.

| Query Parameter | Description                                  | Example                              |
| --------------- | -------------------------------------------- | ------------------------------------ |
| `author`        | Filter books by author name                  | `/api/books?author=Rowling`          |
| `startsWith`    | Filter books by title starting with a letter | `/api/books?startsWith=H`            |
| `language`      | Filter books by language code                | `/api/books?language=eng`            |
| `minRating`     | Filter books by minimum average rating       | `/api/books?minRating=4.5`           |
| `sortBy`        | Sort books by a field (e.g., `title`)        | `/api/books?sortBy=title`            |
| `order`         | Sort order (`asc` or `desc`)                 | `/api/books?sortBy=title&order=desc` |

---

### **2. Get a Book by ID**

**GET** `/api/books/:id`

Retrieve a specific book by its unique `bookID`.

**Example**:

```plaintext
GET /api/books/1461
```

---

### **3. Add a New Book**

**POST** `/api/books`

Add a new book to the database. The `bookID` is auto-generated. You must provide the following fields in the request body:

| Field                | Type     | Description                 |
| -------------------- | -------- | --------------------------- |
| `title`              | `string` | Title of the book           |
| `authors`            | `string` | Author(s) of the book       |
| `average_rating`     | `number` | Average rating of the book  |
| `isbn`               | `number` | ISBN of the book            |
| `isbn13`             | `number` | ISBN-13 of the book         |
| `language_code`      | `string` | Language code of the book   |
| `num_pages`          | `number` | Number of pages in the book |
| `ratings_count`      | `number` | Total ratings of the book   |
| `text_reviews_count` | `number` | Number of text reviews      |

**Example Request Body**:

```json
{
  "title": "New Book Title",
  "authors": "Author Name",
  "average_rating": 4.7,
  "isbn": 123456789,
  "isbn13": 9781234567890,
  "language_code": "eng",
  "num_pages": 250,
  "ratings_count": 100,
  "text_reviews_count": 20
}
```

---

### **4. Filter Books**

Use query parameters to filter books based on criteria. Combine multiple filters as needed.

**Examples**:

- By author: `/api/books?author=Rowling`
- By title starting with "H": `/api/books?startsWith=H`
- By language: `/api/books?language=eng`
- By minimum rating: `/api/books?minRating=4.5`

---

### **5. Sort Books**

Use `sortBy` and `order` query parameters to sort books.

**Examples**:

- Sort by title (ascending): `/api/books?sortBy=title`
- Sort by rating (descending): `/api/books?sortBy=average_rating&order=desc`

## View it live

[Try it out for yourself »](https://project-express-api-ivory.vercel.app/)
