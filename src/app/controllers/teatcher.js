
const fs = require('fs')

//const data_base = require('../../config/data_Base.json')
const data_base =""

const { ageTeacher, date } = require('../../lib/utilsTeatcher')

 

exports.post = function(req, res){
  
   const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == '') {
  
      return res.send('please fill all fields')
    }
  }


  const id  = Number(data_base.teatcher.length + 1)
 
  data_base.teatcher.push({
    id,
    ...req.body,
    age: Date.parse(req.body.age)
    
  })

  fs.writeFile('data_base.json', JSON.stringify( data_base, null, 2), function(err) {
    if(err) return res.send('tem algun erro')
  })

  

  return res.redirect('/members/teatcher')

}





exports.parms = function(req, res){

  const  { id }  = req.params

  const encontraTeacher   = data_base.teatcher.find(function(teatcher){
    
    return teatcher.id == id 
  })

  if(!encontraTeacher) return res.send("nao encontrei o teatcher")

  const teatcher = {
    ...encontraTeacher,
    age:ageTeacher(encontraTeacher.age),
    lesson:encontraTeacher.lesson.split(',')
    
  }

  return res.render('members/teatcher/show_teatcher', { teatcher })
}


exports.edit = function(req, res){

  const { id }  = req.params

  const foundTeatcher = data_base.teatcher.find(function(teacher){
    return teacher.id == id
  })

  if(!foundTeatcher){
    return res.send('nao encotrei para editar')
  }

  const teatcher  = {
    ...foundTeatcher,
    age:date(foundTeatcher.age).iso
  }

  return res.render(`members/teatcher/edit_teatcher`, {teatcher})

}


exports.put = function(req, res){

  let index = 0

  const { id } = req.body 

  const findTeacher = data_base.teatcher.find(function(teatcher , indexTeather){

    if(teatcher.id == id){

      index = indexTeather

      return true
    }
    
  })


  if(!findTeacher){
    return res.send("I  Not found the position of teacher")
  }

  
  const foundTeatcher = {

    ...findTeacher,
    ...req.body,
    id: Number(findTeacher.id),
    age: Date.parse(req.body.age)
  }

  data_base.teatcher[index] = foundTeatcher

  fs.writeFile('data_Base.json', JSON.stringify(data_base, null , 2), function(err) {
    if(err){
      return res.send('aconteceu algun erro a  actulaizar os dados')
    }
  })

  return res.redirect(`/members/teatcher/${id}`)
}


exports.delete = function(req, res){

  const {id} = req.body

  const FilterTeacher = data_base.teatcher.filter(function(teatcher){
    return teatcher.id != id
  })

  data_base.teatcher = FilterTeacher 

  fs.writeFile('data_Base.json', JSON.stringify(data_base, null , 2) ,function(err){
    if(err) {
      return res.send(erro)
    }
  })
  
  return res.redirect('/members/teatcher')

}


exports.index = function(req, res){
  return res.render('members/teatcher/index_teatcher', { teatchers : data_base.teatcher })
}