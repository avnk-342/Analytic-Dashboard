const express = require('express')
const cors = require('cors')
const model = require('./mongodbModel/data')

const app = express()
app.use(cors())
app.use(express.json())

const mongoos = require('mongoose')
mongoos.connect("mongodb://localhost:27017/blackcoffers").then(
    ()=>{console.log("database is connected")},
    err => {console.log("error in connecting database"+ err)}
)

app.get('/', (req,res)=>{
    model.aggregate([
        {
          $group: {
            _id: "$sector", // Group by the sector field
            count: { $sum: 1 } // Count the number of insights in each sector
          }
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            sector: "$_id", // Rename the _id field to sector
            count: 1 // Include the count field
          }
        }
      ])
    .then(data => res.json(data))
    .catch(err => res.json(err))
})


const port = 3000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})