const express = require("express")
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')
const teatcher = require('./app/controllers/teatcher')
const students = require("./app/controllers/students")


const routes = express.Router()


routes.get("/", function(req, res){
  return res.redirect('instructors')
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', function(req , res){
  //req.query
  return res.render('instructors/create')
})


routes.get('/members/teatchers/creat', function(req, res){
  return res.render('members/teatcher/teatcher_creat.njk')
})

routes.get('/members/student/create', students.create)




routes.get('/members/student', students.index)

 
routes.get('/members/create', members.create)


routes.get('/members/teatcher', teatcher.index)


routes.get('/members', members.index)


routes.get('/members/teatcher/:id', teatcher.show)


routes.get('/members/teatcher/:id/edit', teatcher.edit)


routes.get('/instructors/:id', instructors.show)


routes.get('/members/:id', members.show)


routes.get('/instructors/:id/edit', instructors.edit)


routes.get('/members/:id/edit', members.edit)


routes.get('/members/student/:id', students.show)

routes.get('/members/student/:id/edit', students.edit)









routes.post('/members', members.post)
routes.post('/instructors', instructors.post)
routes.post('/members/teatcher', teatcher.post)
routes.post('/members/student', students.verificarCampos_post)




routes.put('/instructors', instructors.put)

routes.put('/members', members.put)

routes.put('/members/teatcher', teatcher.put)

routes.put('/members/student', students.updateStudent)




routes.delete('/instructors', instructors.delete)
routes.delete('/members', members.delete)
routes.delete('/members/teatcher', teatcher.delete)
routes.delete('/members/student', students.delete_Student)




module.exports = routes