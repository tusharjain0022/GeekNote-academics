const express = require("express");
require("./db/mongoose");
const User = require("./models/users");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

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

app.listen(port, () => {
  console.log("Server is up and running on port :" + port);
});
