
const { date, age } = require('../../lib/date.js')

const functionBD= require('../models/bd_members')



module.exports = {

  index(req, res){
    functionBD.index(function(members){

      return res.render('members/index', {members})
    })
  },
  
  post(req, res){
    const keys = Object.keys(req.body)
    for(key of keys){

      if(req.body[keys] == "") return res.send("please fill all fields")
    }


    functionBD.enviadodados_BD(req.body, function(member){
      return res.redirect('/members')
    })



  },

  show(req, res){
    functionBD.showMembers(req.params.id, function(member){

      member.birth = age(member.birth)

      return res.render('members/show_members', {member})
    })
  }

  , 

  edit(req, res){
    functionBD.showMembers(req.params.id, function(member){

      member.birth = date(member.birth).iso

      return res.render('members/edit',{member})
    })
  },



  put(req, res){

    const keys = Object.keys(req.body)

    for(let key of keys){
      if(req.body[key] == ''){
        return res.send('please fill all fiealds')
      }
    }

    functionBD.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`)
    })
  },



  delete(req, res){
    functionBD.delete(req.body.id, ()=>{
      return res.redirect('/members')
    })
  },


}