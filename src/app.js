import express  from "express";
import morgan from "morgan";
import personaroutes from './routes/persona.routes'
import path from 'path'
// const express = require('express')
const app = express()


app.set('port',process.env.PORT || 3000)

// midlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(personaroutes)

//static files
console.log(path.join(__dirname,'public'))
app.use(express.static(path.join(__dirname,'public')))

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });


export default app;
