const express = require('express')
const DbConnect = require('./database/db')
const dotenv = require('dotenv')
const routers = require('./routes')
const app = express()
const errorHandler = require('./middleware/error')

dotenv.config()
DbConnect()

app.use(express.json())

// Hello World Route
app.get('/', (req, res) => {
  res.status(200).send('NoorTakaful Application Running Successfully')
})

// Register App Routers
require('./routes')(app)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
