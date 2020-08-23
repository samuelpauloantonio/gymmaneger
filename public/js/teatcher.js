const  data_Base= require('../../data_Base.json')
const { age, date } =  require('./utils')

exports.editTeatcher = function(req, res){

  const { id }= req.params

  const foundinstructors = data_Base.instructors.find(function(instructors) {
     return  id  == instructors.id
  })
  

  if(!foundinstructors) {
    return res.render('not_found')
  }

  
  const teatcher = {
    ...foundinstructors,
    Birth:date(foundinstructors.Birth),
    services:foundinstructors.services.split(',')

  }

  return  res.render('instructors/teatcher_edit',{teatcher} )


}


exports.showTeatcher = function(req, res){

  const  { id} = req.params

  const foundinstructors = data_Base.instructors.find((instructors) => {
    return  id ==  instructors.id
  })

  if(!foundinstructors) return  res.render('not_found')


  const teatcher = {
    ...foundinstructors,
    Birth:age(foundinstructors.Birth),
    services:foundinstructors.services.split(',')

  }

  return res.render('instructors/show_teatcher', { teatcher })
}
