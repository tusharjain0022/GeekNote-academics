const mongoose = require("mongoose");

const uri = process.env.URI || "mongodb://localhost:27017/geeknote-academics"

mongoose.connect(uri,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connection successfull");
}).catch(()=>{
    console.log("ERROR in database connection");
})