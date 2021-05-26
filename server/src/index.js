const express = require("express");
require("./db/mongoose");
const User = require("./models/users");
const branche=require("./models/branch");
const subject=require("./models/subject");
const individual_topic=require("./models/individual_topic");

const cors=require("cors");


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// @###################### for authentication @###############################
// app.post("/users", (req, res) => {
//   const user = new User(req.body);
//   console.log(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(200).send(user);
//     })
//     .catch(() => {
//       res.status(400).send(user);
//     });
// });



// for fethcing data of 8 (RESOURCES SECTION) cards in home page
app.get("/",async(req,res)=>{
  try{
      const getData=await branche.find({});
      res.send(getData);
  }catch(e){
      console.log("error during get request",e);
      res.send(e);
  }
})

app.post("/insertBranch",async(req,res)=>{
  try{
      const branchData=new branche(req.body);
      const addData=await branchData.save();
      res.send(addData);
  }
  catch(e){
      console.log("error during post request",e);
      res.send(e);
  }
})

// for inserting Subjects in database
app.post("/insertSubject",async(req,res)=>{
  try{
      const addSubject=new subject(req.body);
      const insertSubject=await addSubject.save();
      res.send(insertSubject);
  }
  catch(e){
      console.log("error during posting subject",e);
      res.send(e);
  }
})

// for fetching data of subjects and their topics
app.get("/:branch/:year/:semester",async(req,res)=>{
  const branch=req.params.branch;
  const year=req.params.year;
  const semester=req.params.semester;
  const obj={branch:branch,year:year,semester:semester};
  try{
      const getData=await subject.find(obj);
      var subject_names=[];
      var topics={};
      for(var i of getData) {
          subject_names.push(i.name);
          const obj_2={branch:branch,year:year,semester:semester,subject:i.name};
          const getTopic=await individual_topic.find(obj_2);
          topics[i.name]=getTopic;
      }
      var result={};
      result.sub=subject_names;
      result.top=topics;
      res.send(result);
  }catch(e){
      console.log("error during get request",e);
      res.send(e);
  }
})


// inserting topics of subject
app.post("/insertTopic",async(req,res)=>{
  try{
      const addTopic=new individual_topic(req.body);
      const insertTopic=await addTopic.save();
      res.send(insertTopic);
  }
  catch(e){
      console.log("error during posting subject",e);
      res.send(e);
  }
})


app.listen(port, () => {
  console.log("Server is up and running on port :" + port);
});
