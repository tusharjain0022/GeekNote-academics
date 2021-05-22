const mongoose=require("mongoose");

const subjectSchema=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
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
    subjects:[
        {
            id:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:true
            }
        }
    ],
    branch:{
        type:String,
        required:true,
    }
});

const subject=new mongoose.model("subject",subjectSchema);
module.exports=subject;