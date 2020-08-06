const fs = require('fs')
const data_Base = require('./data_Base.json')

//req.params 


exports.show = function(req , res){
  const { id } = req.params 

  const foundInstructor = data_Base.instructors.find(function(instructors){
    return instructors.id == id  
  })
  if(!foundInstructor){

      return res.status(404).render('not_found')
  
  }


  return res.send(foundInstructor)
}

exports.post = function(req, res){
  
  const keys = Object.keys(req.body)
  const data_Base = require('./data_Base.json')


  for(key of keys){
    if(req.body[key] == ''){
      return res.send("please fill all fields")
    }
  }



 

let {url_avatar,name, Birth, agenda , services} = req.body

  Birth = Date.parse(req.body.Birth)
  const date_now = Date.now()
  const id = Number(data_Base.instructors.length + 1 )


  data_Base.instructors.push({
    id,
    url_avatar,
    name,
    Birth,
    agenda,
    services,
    date_now
  })

  fs.writeFile('data_Base.json', JSON.stringify(data_Base, null, 2) , function(err){
    if(err) return res.sed("algun erro aconteceu") 
  })



   return  res.send(data_Base)
}