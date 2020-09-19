
const students = require('../models/bd.student')
const { age, date}  = require('../../lib/date')



module.exports = {


 index(req, res){
   students.showStudent_Index(function(Allstudents){
      return res.render('members/student/index', {students : Allstudents})
   })
 },


  create (req, res){
    return res.render('members/student/create')
  },


 verificarCampos_post(req, res){

   const keys = Object.keys(req.body)

   for(key of keys) {
     if(req.body[key] == ""){
       return res.send("campos Vazios porfavor preencha")
     }
   }

   students.sendData_post(req.body, function(student_id){

    return res.redirect(`/members/student/${student_id}`)
   
   })
   
 },

 show(req,  res){
    students.showStudent_single(req.params.id , function(student){

      if(!student) return res.send("student not-found")
      
      student.birth = age(student.birth)

      return res.render('members/student/show', {student})
    })
 },

 edit(req,  res){
    students.showStudent_single(req.params.id , function(student){

      if(!student) return res.send("student not-found")
      
      student.birth = date(student.birth).iso

      return res.render('members/student/edit', {student})
    })
 },


 updateStudent(req, res){

  students.updateStudant(req.body, function(){


    return res.redirect(`/members/student/${req.body.id}`)
  })
 },



 delete_Student(req, res){
   students.delete(req.body.id, ()=>{

     return res.redirect('/members/student/')
   })
 }
 


}


