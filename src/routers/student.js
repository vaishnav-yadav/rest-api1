const express= require('express');
const Student = require('../models/students');
//Express Router
// 1. create a new router
const router = new express.Router();


// // 2. we need to define the router
// router.get('/class', (req,res) =>{
//     res.send('Hello Class Welcome');
// })
router.post("/students", async (req, res) => {
    try {
      const user = new Student(req.body);
      const createUser = await user.save();
      res.status(201).send(createUser);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
 
  //you can make post request now from any browser or postman using localhost:3000/students request 
  
  
  
  //GET is used to read the data
  
  router.get('/students' , async (req, res)=>{
      try{
  
          const studentsData = await Student.find(); //getting users data 
          res.send(studentsData); //showing users data 
  
      }catch(e){
            res.status(400).send(e);
      }
  });
  //you can make get request now from any browser or post man using localhost:3000/students request 
  
  
  
  // get the individual Student data using id
  
  router.get('/students/:id' , async(req, res)=>{
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
  
  router.patch('/students/:id', async(req, res)=>{
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
  
  router.delete('/students/:id' , async(req, res)=>{
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

module.exports = router;