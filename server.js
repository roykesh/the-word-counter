const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const validator = require('validator')

const app = express()

app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)

const port = 3003
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})