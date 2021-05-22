const mongoose=require("mongoose");

const indvidual_topic_schema= new mongoose.Schema({
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    note:{
        type:Boolean,
        required:true
    },
    video:{
        type:Boolean,
        required:true
    }
});

const individual_topic = new mongoose.model("individual_topic",indvidual_topic_schema);
module.exports = individual_topic;