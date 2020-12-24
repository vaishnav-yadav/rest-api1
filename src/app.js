const express = require("express");
require("./db/conn"); //requiring the conn.js file
const Student = require("./models/students");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from the other sides, so you have made a get request ");
});

//now we are adding results directly by posting it from postman by making post request

// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body); //getting post request here of storing data in Student database. Getting student data in user

//   //below code will store the user data that was posted in our database mongodb
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
//   // res.send('hello user you have made a post request');
// });

//post request using async await

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`connection is set up at ${port}`);
});
