import express from "express";
import booksData from "../data/books.json";

const router = express.Router()

router.get("/", (req, res) => {
    res.json(booksData)
})

router.get("/top-rated", (req, res) => {
    const highAvgRating = booksData.filter((book) => book.average_rating >= 4)
    res.status(200).json(highAvgRating)
})

router.get("/title/:title", (req, res) => {
    const title = req.params.title
    let titleInput = booksData.find((str) => str.title.toLowerCase() === title.toLowerCase())

    if (titleInput) {
        res.status(200).json({
            data: titleInput,
            success: true
        })
    } else {
        res.status(404).json({
            data: "Not found",
            success: false
        })
    }
})

router.get("/author/:authors", (req, res) => {
    const authors = req.params.authors
    let authorsInput = booksData.filter((str) => str.authors.toLowerCase() === authors.toLowerCase())
    // always console.log to troubleshoot!! --> console.log(authorsInput)
    if (authorsInput.length > 0) {
        res.status(200).json({
            data: authorsInput,
            success: true
        })
    } else {
        res.status(200).json({
            data: "Not found",
            success: false
        })
    }
})

module.exports = router