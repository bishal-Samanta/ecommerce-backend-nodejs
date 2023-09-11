const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req , res , next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decode = jwt.verify(token , process.env.JWT_SECRET);
                const user = await userModel.findById({_id: decode?.id });
                req.user = user;
                next();
            }
        }
        catch(err){
            throw new Error("Not authorized , token expire, please login again...")
        }
    }
    else{
        throw new Error("There is no token attached to our header");
    }

})

const isAdmin = asyncHandler(async (req , res , next) =>{
    const {email} = req.user;
    const adminUser = await userModel.findOne({email});
    if(adminUser.role !== "admin"){
        throw new Error("Prohibited , You are not an admin");
    }
    else{
        next();
    }

})


module.exports = {authMiddleware , isAdmin};