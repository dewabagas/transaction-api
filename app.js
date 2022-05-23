const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000

const userRoutes = require("./routes/user")

app.use(express.json())
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})