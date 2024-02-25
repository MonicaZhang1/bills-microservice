const express = require('express');
const cors = require('cors');
// const createError = require('http-errors');
const app = express();
require('dotenv').config();

const port = 3000;

// Use JSON, encode URLs, apply CORS
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

// Routes
const billRoutes = require('./routes');
app.use('/bills', billRoutes)

// Info 
app.get('/', function(req, res, next){
    res.json({info: 'Microservice is live.'})
});

// Error handling

// app.use(function (req, res, next){
//     next(createError(404));
// })

// app.use(function(err, req, res, next){
//     res.status(err.status || 500);
//     res.json(err)
// })
app.use((req, res)=>{
    res.status(404).json({message: 'Route not found'})
})

// Run server
app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`)
})

module.exports = app; 