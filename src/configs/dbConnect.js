const { default: mongoose } = require("mongoose")

const dbConnect = async () =>{
    try{
        const connect = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database conencted properly");
    }
    catch(err){
        console.log("Database Error " , err );
    }
}

module.exports = dbConnect;