import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// First page
app.get('/', (req, res) => {
	res.send('This is an API with books')
})
// All books in the API
app.get('/books', (req, res) => {
	const { title, author, sort } = req.query
	let bookList = booksData

	// Filtering by title
	if (title) {
		bookList = bookList.filter((item) => item.title.toString().toLowerCase().includes(title.toLocaleLowerCase()))
	}
	// Filtering by Author
	if (author) {
		bookList = bookList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLocaleLowerCase()))
	}
	// Rating high to low
	if (sort === 'rating_dsc') {
		bookList = bookList.sort((a, b) => b.average_rating - a.average_rating)
		//Rating low to high
	} else if (sort === 'rating_asc') {
		bookList = bookList.sort((a, b) => a.average_rating - b.average_rating)
	}
	// Error message for title & author
	if (bookList.length === 0) res.status(404).send({ error: 'Sorry, could not find that title/author' })
	res.json({ numberOfBooks: bookList.length, result: bookList })
})
// Endpoint ID
app.get('/books/:id', (req, res) => {
	const id = req.params.id
	const showBook = booksData.find((item) => item.bookID === +id)

	// Error message for ID
	if (!showBook) res.status(404).send({ error: 'Sorry, could not find that book' })
	res.json(showBook)
}),
// Future endpoint 
app.get('addBook', (req, res) => {
	res.send('addBook coming soon')
})
	// Start the server
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`)
	})
