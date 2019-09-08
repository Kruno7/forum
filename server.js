const http = require('http')
const app = require('./app')
require('dotenv').config()

const port = process.env.PORT || 5006

const server = http.createServer(app)

server.listen(port, () => console.log(`Server started on ${port}`))
