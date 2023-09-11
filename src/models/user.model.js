const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
   firstName:{
        type:String,
        required:true,
    },
    lastName : {
        type : String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default : "user"
    },
    cart : {
        type : Array,
        default : []
    },
    wishlist : [{type : mongoose.Schema.Types.ObjectId , ref : "Product"}],
    address : [{type : mongoose.Schema.Types.ObjectId , ref : "Address"}]
}, {
    timestamps : true,
    autoIndex: true
});

//Hashing password
userSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password , salt);
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}


//Export the model
module.exports = mongoose.model('user', userSchema);