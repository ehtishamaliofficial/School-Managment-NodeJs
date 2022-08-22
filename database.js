const mongoose=require("mongoose");
const chalk=require('chalk');


url="mongodb://localhost:27017/School"


const datebaseConnection=mongoose.connect(url,()=>{
    console.log(chalk.blue.inverse('Database connected:MogoDB'))
})

module.exports=datebaseConnection;