const instructors = require('../models/db_instructors')
const {age, date} = require('../../lib/date')


module.exports = {


  index(req, res) {

    instructors.all(function (instructors) {
      return res.render('instructors/index', {
        instructors
      })
    })

  },

  post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') return res.send(' campos vazios ')
    }

   instructors.EnviadoParaBandoDados(req.body, function(callback){

     return res.redirect(`/instructors/${callback.id}`)
   })
  },


  show(req, res) {

  instructors.find(req.params.id, function(instructor){
    
    if(!instructor) {
      return res.send('instructor not_found')
    }

    instructor.birth = age(instructor.birth)
    instructor.services = instructor.services.split(",")
    instructor.date_now = date(instructor.date_now).format
    
    return res.render('instructors/show_instructor', {instructor})
  })
    

    
  }, 



  edit(req, res) {

    instructors.find(req.params.id, function(instructor){
      if(!instructors) return res.send('instructor not_found')
  
      instructor.birth = date(instructor.birth).iso
      
      
      return res.render('instructors/edit', {instructor})
    }) 
  },

  put(req, res) {

    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '') {
        return res.send('please fill all fiealds')
      }
    }


    instructors.update(req.body, function(){

      return res.redirect(`/instructors/${req.body.id}`)
    })


  },


  delete(req, res) {
    instructors.delete(req.body.id, function(){
      return res.redirect("/instructors")
    })
  },


}