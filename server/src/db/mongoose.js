const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/geeknote-academics",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connection successfull");
}).catch(()=>{
    console.log("ERROR in database connection");
})