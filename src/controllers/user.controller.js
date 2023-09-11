const { generateToken } = require("../configs/jwtToken.js");
const { errorHandler } = require("../middlewares/errorHandler.js");
const userModel = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");

const createUserController = asyncHandler(async (req , res) =>{
    try{
        const { email } = req.body;
        const findUser = await userModel.findOne({email});

        if(!findUser){
            const newUser = await userModel.create(req.body);
            return res.status(201).json({data : newUser , success : true});
        }
        else{
            throw new Error("User Already Exist");
        }

    }
    catch(err){
        // console.error("Error:", err);
        errorHandler(err, req, res); // Using the errorHandler function
    }
})

const loginUserController = asyncHandler(async (req , res) =>{
    const {email , password} = req.body;
    const findUser = await userModel.findOne({email});

    if(findUser && await findUser.isPasswordMatched(password) ){
        res.status(201).send({data: {
            
            _id: findUser?._id,
            firstName : findUser?.firstName,
            lastName : findUser?.lastName,
            email : findUser?.email,
            mobile : findUser?.mobile,
            token : generateToken(findUser?._id),

        } , message :"Correct user credentials"});
    }
    else{
        throw new Error("Invalid Creadentials");
    }

})

const getAllUser = asyncHandler(async (req , res) =>{
    try{
        const allUser = await userModel.find();
        res.status(200).json({data : allUser , success : true});
    }
    catch(err){
        throw new Error(err);
    }
})

const getSingleUser = asyncHandler(async (req , res) =>{
    try{
        const { id } = req.params;
        const getUser = await userModel.findOne({_id: id});
        res.status(200).json({data: getUser , success : true})
    }
    catch(err){
        throw new Error(err);
    }

})


const deleteSingleUser = asyncHandler(async (req , res) =>{
    try{
        const { id } = req.params;
        const deleteUser = await userModel.findByIdAndDelete({_id: id});
        res.status(200).json({data: deleteUser , success : true})
    }
    catch(err){
        throw new Error(err);
    }

})

const updateUser = asyncHandler(async(req , res) =>{
    const {_id } = req.user;
    console.log("id : " , _id);
    try{
        const findUser = await userModel.findByIdAndUpdate(_id , {
            firstName : req?.body?.firstName,
            lastName: req?.body?.lastName,
            mobile: req?.body?.mobile,
            email : req?.body?.email
        }, {
            new: true
        })

        res.status(201).json({data: findUser , success : true });

    }catch(err){
        throw new Error(err);
    }



})

module.exports = { updateUser , createUserController , loginUserController , getAllUser , getSingleUser , deleteSingleUser};