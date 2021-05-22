const mongoose=require("mongoose");

const branchSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    branch:{
        type:String,
        required:true,
    },
    semester:[
        {
            id:{
                type:String,
                required:true,
            },
            totalSub:{
                type:Number,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            timetable:{
                type:String,
                required:true
            },
            intro:{
                type:String,
                required:true
            },
            link:{
                type:String,
                required:true
            }
        }
    ]
});

const branch = new mongoose.model("branch", branchSchema);
module.exports = branch;