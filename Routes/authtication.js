const express=require('express');
const User=require('../Model/Authntication')
const{body,validationResult}=require('express-validator');
const bcrypt = require('bcrypt');









const router=express.Router();
//@Route:Create a new user
router.post('/register',[
    //Add validation rules
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("User Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  ],async (req,res)=>{
    try {
      const email=await User.findOne({email:req.body.email})
      if(email){
        res.send({Massage:"Already Register"})
      }
      const hashPassword=await bcrypt.hash(req.body.password,5)
      const newUser=new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
      })
      const result=await newUser.save();
      res.send(result)
    } catch (error) {
      console.log(error);
    }

})


//@Router:Login
router.get('/login',[
  body("email").not().isEmpty().withMessage("Email is Required"),
  body("password").isLength({min:6}).withMessage("Password is Required")
],async (req,res)=>{
  try {
    const user=await User.findOne({email:req.body.email});
    const myPassword=await bcrypt.compare(req.body.password,user.password);
    if (user.email==req.body.email) {
        if(myPassword){
          res.send({Massage:`Login SuccessFull! Welcome the ${user.name} `})
        }
        else{
          res.send({Massage:"Email or Password or Wrong"})
        }
    } else {
      res.send({Massage:"Email or Password or Wrong"})
    }
  } catch (error) {
    console.log(error);
  }
})

module.exports=router;