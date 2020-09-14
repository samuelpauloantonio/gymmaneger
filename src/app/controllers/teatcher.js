

const  functionBD = require('../models/db_teatcher')
const {date, age} = require('../../lib/date')

module.exports  =  {

  index(req, res){
    
    functionBD.allTeatchers(function(teatchers){
      return res.render('members/teatcher/index_teatcher',{teatchers})
    })
  },

  
  post(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Há campos vazios")
      }
    }
    
    functionBD.insertIntoDB(req.body, function(teatcher){
      return res.redirect(`/members/teatcher/${teatcher.id}`)
    })

   

  },

  show(req, res){
    
    functionBD.showTeacher(req.params.id, function(teatcher){
      if(!teatcher) return res.send("teatcher not_found")


      teatcher.birth = age(teatcher.birth)
      teatcher.lesson = teatcher.lesson.split(",")



      return res.render('members/teatcher/show_teatcher', {teatcher})
    })

  },

  edit(req, res){
    
    functionBD.showTeacher(req.params.id, function(teatcher){
      if(!teatcher) return res.send("teatcher not_found")


      teatcher.birth = date(teatcher.birth).iso

      return res.render("members/teatcher/edit_teatcher", {teatcher})
    })
  }
}