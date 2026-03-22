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
const authRoutes=require('./routes/authRoutes.js')
const questionRoutes=require('./routes/questionsRoutes.js');
const answersRoutes=require('./routes/answersRoutes.js');
// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome to Quora API"});
});
app.use('/api/auth',authRoutes);
app.use('/api/questions',questionRoutes);
app.use('/api/answers',answersRoutes);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on the PORT -> ${PORT}`.bgMagenta.white);
});