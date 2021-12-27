const mongoose = require("mongoose");

const uri = process.env.URI || "mongodb://localhost:27017/geeknote-academics"

// mongoose.connect(uri,{
//     useCreateIndex:true,
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("database connection successfull");
// }).catch(()=>{
//     console.log("ERROR in database connection");
// })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));
