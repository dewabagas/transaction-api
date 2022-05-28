const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000

const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const categoryRoutes = require("./routes/category")
const transactionHistoryRoutes = require("./routes/transactionHistory")

app.use(express.json())
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/transactions', transactionHistoryRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})