
const mongoose=require("mongoose");
const userschema = new mongoose.Schema(
    {name:String}
)
module.exports=mongoose.model("user",userschema);