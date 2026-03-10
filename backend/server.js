const express=require('express');
const colors=require('colors');
const morgan=require('morgan')
const dotenv=require('dotenv');
const cors=require('cors');
// config
dotenv.config();

const app=express();

// importing modules 
const connectDB=require('./config/db');
connectDB();
const authRoutes=require('./routes/authRoutes.js');


// middleware   s
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/auth',authRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on the PORT -> ${PORT}`.bgMagenta.white);
});