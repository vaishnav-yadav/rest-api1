const express = require("express");
require("./db/conn"); //requiring the conn.js file
const Student = require("./models/students");
const studentRouter = require('./routers/student');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
// /3. We need to register our router
app.use(studentRouter);
app.listen(port, () => {
    console.log(`connection is set up at ${port}`);
  });








