const express = require('express')
const mongoose = require("mongoose")
const db = require('./models')
const path = require('path');

const PORT = process.argv[2] || process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoBooks"
mongoose.connect(MONGODB_URI)


const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(require('./routes/bookRoutes')(db))
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')))
// }

app.listen(PORT, () => {
  const x = '----------------------------------------'
  console.log(`\n\n\n${x}\nServer listening on port ${PORT}\n${x}\n`)
})
