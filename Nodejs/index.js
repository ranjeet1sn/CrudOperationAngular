const express = require('express')
const app = express()
const cors=require('cors')
var bodyParser = require('body-parser')
const {mongoose}=require('./db')
var employeeController=require('./controllers/employeeControlers')
app.use(bodyParser.json())
app.use(cors({origin:"http://localhost:4200"}));
app.listen(3000,()=>{
    console.log("Port is listening")
})
app.use('/employees',employeeController)