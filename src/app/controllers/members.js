
const { date,  Datenow } = require('../../lib/date.js')



module.exports = {

  index(req, res){8
    return res.render('members/index')
  },
  
  post(req, res){

    const keys = Object.keys(req.body)


    for(let key of keys){
      if(req.body[key] == ''){
        return res.send("please fill all fields")
      } 
     
    }
  },

  show(req, res){
    return
  }

  , 

  edit(req, res){
    return
  },



  put(req, res){

    const keys = Object.keys(req.body)

    for(let key of keys){
      if(req.body[key] == ''){
        return res.send('please fill all fiealds')
      }
    }
  },



  delete(req, res){
    return 
  },


}