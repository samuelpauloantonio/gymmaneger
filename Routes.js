const express = require("express")
const instructors = require('./instructors')

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



routes.post('/instructors', instructors.post)

routes.get('/instructors/:id', instructors.show)


module.exports = routes