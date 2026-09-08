require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', async (request, response) => {
  try {
    const result = await pool.query('SELECT NOW() AS database_time')

    response.status(200).json({
      message: 'Server and database are running',
      databaseTime: result.rows[0].database_time,
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)

    response.status(500).json({
      message: 'Server is running but database connection failed.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})