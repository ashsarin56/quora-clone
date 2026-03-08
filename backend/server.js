const express=require('express');
const colors=require('colors');
const morgan=require('morgan')
const dotenv=require('dotenv');
// config
dotenv.config();

const app=express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

const PORT=process.env.PORT || 5000;

app.listen(()=>{
    console.log(`Server is listening on the PORT -> ${PORT}`.bgMagenta.white);
});