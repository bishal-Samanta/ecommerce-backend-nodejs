const express = require('express');
const dbConnect = require('./src/configs/dbConnect');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const authRouter = require('./src/routes/auth.route.js');
const { notFound, errorHandler } = require('./src/middlewares/errorHandler');


app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

app.use('/api/user' , authRouter);

//Error handler 
app.use(notFound);
app.use(errorHandler);


app.listen( PORT, () =>{
    try{
        console.log(`Server is listening on port : ${PORT}`);
        dbConnect();
    }
    catch(err) {
        console.log("Err : " , err);
    }
})