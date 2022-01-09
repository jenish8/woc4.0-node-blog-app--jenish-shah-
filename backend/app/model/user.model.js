
const mongoose=require("mongoose");
const userschema = new mongoose.Schema(
    {name:String,cno:String}
)
module.exports=mongoose.model("user",userschema);