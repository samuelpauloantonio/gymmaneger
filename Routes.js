const express = require("express")
const instructors = require('./instructors')

const routes = express.Router()


routes.get("/", function(req, res){
  return res.redirect('instructors')
})

routes.get('/instructors', function(req, res){
  return  res.render("instructors/index")
})


routes.get('/members', function(req, res){
  return res.send("members")
})

routes.get('/instructors/creat', function(req , res){
  //req.query
  return res.render('instructors/creat')
})

routes.post('/instructors', instructors.post)



module.exports = routes