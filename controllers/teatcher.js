const fs = require('fs')
const data_base = require('../data_Base.json')
const {age, Datenow} = require('./date')


exports.get = function(req, res){

  const { id } = req.params 

  const foundteatcher = data_base.instructors.find(function(instructor){
    
    return  instructor.id == id
  })

  if(!foundteatcher){
    return res.send('nao encotrei o teatcher')
  }

  const instructor  = {
    ...foundteatcher,

      Birth:age(foundteatcher.Birth),

      services: foundteatcher.services.split(','),

      date_now: Datenow(foundteatcher.date_now)

    
  }


  return res.render('instructors/teatcher/teatcher_edit', {teatcher : instructor})

}

exports.update = function(req, res){
  
  const { id } = req.body 
  let index = 0

  const compareInstructors = data_base.instructors.find(function(instructor, foundIndex){
    if(instructor.id ==  id){
      foundIndex = index

      return true
    }
  })

  if(!compareInstructors) return  res.send('não encotrei o instructor')
  
  const instructor = {
    ...compareInstructors,
     Birth: Date.parse(req.body.Birth)
  }

  data_base.instructors = compareInstructors 

  fs.writeFile('data_base.json', JSON.stringify(data_base, null, 2), (err) => {
   
    if(err) return res.send('write file error')
  })

  return res.redirect(`instructors/teatcher/show_teatcer ${id}`, {instructor})

}