const express = require("express")
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')
const teatcher = require('./controllers/teatcher')

const routes = express.Router()


routes.get("/", function(req, res){
  return res.redirect('instructors')
})
routes.get('/instructors', instructors.index)

routes.get('/instructors/creat', function(req , res){
  //req.query
  return res.render('instructors/creat')
})





routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)



routes.get('/members', function(req, res){
  return res.render("instructors/index")
})
routes.get('/members/creat', function(req , res){
  //req.query
  return res.render('instructors/creat')
})
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post('/members', members.post)
routes.put('/members', members.put)
routes.delete('/members', members.delete)


routes.get('/instructors/teatcher/:id', teatcher.get)
routes.get('/instructors/teatcher/:id/edit', teatcher.get)
routes.put('/instructors/teatcher', teatcher.update)

module.exports = routes