const fs = require('fs')
const data = require('./data.json')

exports.post = function(req,res){
  const keys = Object.keys(req.body)
  for(key of keys){
    if(req.body[key] == ''){
      return res.send('please, fill all fields')
    }
  } 
  req.body.Birth = Date.parse(req.body.Birth)
  req.body.date_Now = Date.now()
  
  
  data.constructors.push(req.body)
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2 ), function(err) {
    if(err){
      return  res.send("Ouve um erro")
    }
    return res.redirect('/instructors')
   
  })
   

 // return res.send(req.body)
}