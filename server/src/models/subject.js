const mongoose=require("mongoose");

const subjectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true  
    },
    semester:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    }
});

const subject=new mongoose.model("subject",subjectSchema);
module.exports=subject;