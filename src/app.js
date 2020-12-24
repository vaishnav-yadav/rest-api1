const express = require("express");
require("./db/conn"); //requiring the conn.js file
const Student = require("./models/students");
const studentRouter = require('./routers/student');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);


//Express Router , first 2 steps in router's student.js
// 1. create a new router
// const router = new express.Router();

// 2. we need to define the router
// router.get('/class', (req,res) =>{
//     res.send('Hello Class Welcome');
// })

//3. We need to register our router
// app.use(router); //we can get the response using localhost:3000/class









// POST :- 

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
//POST is used to create 

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
//you can make post request now from any browser or postman using localhost:3000/students request 



//GET is used to read the data

app.get('/students' , async (req, res)=>{
    try{

        const studentsData = await Student.find(); //getting users data 
        res.send(studentsData); //showing users data 

    }catch(e){
          res.status(400).send(e);
    }
});
//you can make get request now from any browser or post man using localhost:3000/students request 



// get the individual Student data using id

app.get('/students/:id' , async(req, res)=>{
    try{
        const _id= req.params.id;
        const studentData= await Student.findById({_id: _id});

        if(!studentData){
            return res.status(404).send();
        }
        else
        {

            res.send(studentData);
        }
        // console.log(req.params);
    }catch(e){
        res.status(500).send(e);
        console.log(e);
    }
});



// UPDATE : to update the documents of a collection

app.patch('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate({_id : _id } , req.body,{
            new : true //to see the changes immediately in postman request 
        });
        res.status(200).send(updateStudent);//it will return the updated data , go to the postman and change the data by clicking to body and then click to raw and then change email using json format 
        //{
        //     "email" : "vaishnavyadav4444@gmail.com"
        // } in postman and make patch request , data will be updated 
    }catch(e) {
         res.status(404).send(e);
    }
})




//DELETE  : to delete the document or records of a collection

app.delete('/students/:id' , async(req, res)=>{
    try{
            const _id = req.params.id;
            const deleteStudent = await Student.findByIdAndDelete({_id: _id});
            if(!deleteStudent){
                return res.status(400).send();
            }else{
                res.send(deleteStudent);
            }
    }catch(e)
    {
        res.status(500).send(e);
    }

})