const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors')


const db = require('./config/config')

require('dotenv').config()

const authRoutes = require('./routes/auth')
const expenseRoutes = require('./routes/expenses')


const app = express();


const port = process.env.PORT || 3000
const url = process.env.MongoDB_URL
const corsOptions = {
    origin: '*',
    credentials: true,
  };
app.use(cors(corsOptions))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
//   });

app.use(express.json())
app.use("/auth",authRoutes)
app.use("/expense",expenseRoutes)




const appEndPoint = async(url)=>{
    try {
        await db.connectDb(url)
        const server =  app.listen(port,()=>{console.log(`App connected to db and listening at port ${port}`)})
    } catch (error) {
        
        console.log(error)
    }

}
appEndPoint(url)