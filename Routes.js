const express = require("express")
const instructors = require('./public/js/instructors')
const teatcher = require('./public/js/teatcher.js')

const routes = express.Router()


routes.get("/", function(req, res){
  return res.redirect('instructors')
})

routes.get('/instructors', function(req, res){
  return  res.render("instructors/index")
})


routes.get('/instructors/members', function(req, res){
  return res.render("instructors/members")
})

routes.get('/instructors/creat', function(req , res){
  //req.query
  return res.render('instructors/creat')
})





routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.get('/instructors/teatcher/:id', teatcher.showTeatcher)

routes.get('/instructors/teatcher/:id/edit', teatcher.editTeatcher)




routes.post('/instructors', instructors.post)

routes.post('/teatcherForm', instructors.post)

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

module.exports = routes