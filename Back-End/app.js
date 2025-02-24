const express= require('express')
// const mongoose =require('mongoose');
const connectDB=require('./db/Connect')
const Brand=require('./Routes/brand')
const subCategory=require('./Routes/category')
require('dotenv').config()
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors());


app.use("/api/brands", Brand);
app.use("/api/categories", subCategory);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
