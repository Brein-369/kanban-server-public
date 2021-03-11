if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
    console.log("dotenv run on development");
}

const express = require('express')
const app = express()
const port = 3000
const allRoute = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(allRoute)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})