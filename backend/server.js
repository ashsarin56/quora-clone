const express=require('express');
const colors=require('colors');
const morgan=require('morgan')
const dotenv=require('dotenv');
const app=express();

// config
dotenv.config();

// importing modules 
const connectDB=require('./config/db');
connectDB();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on the PORT -> ${PORT}`.bgMagenta.white);
});