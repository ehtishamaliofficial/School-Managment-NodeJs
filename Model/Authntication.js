const mongoose=require('mongoose');
const validator=require('validator');

const Schema=mongoose.Schema;

const UserSchema=Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invaild")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLenght:8,
        maxLenght:30
    }
},{ timestamps: { createdAt: 'created_at' } })



module.exports=mongoose.model("authntication",UserSchema);