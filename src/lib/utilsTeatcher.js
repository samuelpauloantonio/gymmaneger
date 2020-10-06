


module.exports = {

  ageTeacher: function(timestamp){

    const date = new Date()
    const birth  = new Date(timestamp)

    let age = date.getFullYear() - birth.getFullYear()
    const month  = date.getMonth() - birth.getMonth()

    if(age < 0 || month == 0 && date.getDate() <= birth.getDate ) age = age - 1
    return age
  }
  , 

  date: function(timestamp){
    const date  = new Date(timestamp)

    const year = date.getUTCFullYear()

    const month = `0${date.getUTCMonth() + 1}`.slice(-2)

    const day = `0${ date.getDate() }`.slice(-2)

  return  {
      day, 
      month,
      year,
      iso: `${year}-${month}-${day}`
    }
  }
  
}

