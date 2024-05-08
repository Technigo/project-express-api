const express = require("express")
const listEndpoints = require("express-list-endpoints")
const apiRoutes = require("./routes/api.js")

const port = process.env.PORT || 3001
const app = express()

app.use("/api/", apiRoutes)

app.get("/", (req, res) => {
    const endpoints = listEndpoints(app)
    res.json(endpoints)
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
