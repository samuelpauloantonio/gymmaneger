const fs = require('fs')
const data_Base = require('../data_Base.json')

const { date, age, Datenow } = require('./date.js')




//post
exports.post = function(req, res){
  
  const keys = Object.keys(req.body)
  const data_Base = require('../data_Base.json')


  for(key of keys){
    if(req.body[key] == ''){
      return res.send("please fill all fields")
    } 
    if(req.body.services == ''){
      return res.send('services esta vazio')
    }
  }

let {url_avatar, name, Birth, age , services} = req.body

  Birth = Date.parse(req.body.Birth)
  
  const date_now = Date.now()

  const id = Number(data_Base.instructors.length + 1 )


  data_Base.instructors.push({
    id,
    url_avatar,
    name,
    Birth,
    age,
    services,
    date_now
  })

  fs.writeFile('data_Base.json', JSON.stringify(data_Base, null, 2) , function(err){
    if(err) return res.sed("algun erro aconteceu") 
  })



   return  res.redirect('instructors')
}

//get
exports.show = function(req , res){
  const { id } = req.params 

  const foundInstructor = data_Base.instructors.find(function(instructors){ 
    return instructors.id == id  
  })

  
  if(!foundInstructor){
      return res.status(404).render('not_found')
  }

 
  const instructor  = {
    ...foundInstructor,

      Birth:age(foundInstructor.Birth),

      services: foundInstructor.services.split(','),

      date_now: Datenow(foundInstructor.date_now)

    
  }


  return res.render('instructors/show_instructor', {instructor})


}


//get
exports.edit = function(req , res){

  const { id } = req.params 

  const foundInstructor = data_Base.instructors.find(function(instructors){ 
    return id == instructors.id
  })

  
  if(!foundInstructor){
      return res.status(404).render('not_found')
  }

  const instructor = {
    ...foundInstructor ,
    Birth: date(foundInstructor.Birth)
  }


  return res.render('instructors/edit', { instructor})
}

//put
exports.put = function(req, res){

  let index = 0

  const { id } = req.body

  const foundInstructor = data_Base.instructors.find((instructor, foundIndex) => {
    
    if(instructor.id == id){

      index = foundIndex
      return true
    }
  })

  if(!foundInstructor) return  res.send(' nao achei o isntructors')


  const instructor = {
    ...foundInstructor,
    ...req.body,
    Birth: Date.parse(req.body.Birth)

  }

  data_Base.instructors[index] = instructor

  fs.writeFile('data_Base.json', JSON.stringify(data_Base, null , 2), (err) => {
    
    if(err) return res.send('aconteceu algum erro ao salvar os ficheiros')
  })

  return res.redirect(`instructors/${id}`)

}


//delete
exports.delete = function(req, res){
  
  const  { id } = req.body

  const filterInstructors = data_Base.instructors.filter(function(instructor) {
    
     return instructor.id  != id

    })
     data_Base.instructors  = filterInstructors

     fs.writeFile('data_base.json', JSON.stringify(data_Base, null, 2), (err) => {
       
      if(err) return  res.send('write file error')

      return res.redirect('instructors')

     })
 
}



exports.index = function(req, res){

  return  res.render("instructors/index", { instructors : data_Base.instructors})
}








