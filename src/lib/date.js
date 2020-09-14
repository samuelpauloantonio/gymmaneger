module.exports = {
  date(timestamp){

    const date = new Date(timestamp)

    const year = date.getUTCFullYear()

    const  Month = `0${date.getUTCMonth()+ 1}`.slice(-2)

    const day  = `0${date.getUTCDate()}`.slice(-2)

   return  {
    day,
    Month,
    year,
    iso: `${year}-${Month}-${day}` ,
    birthday : `${day}/${Month}`,
    format: `${day}/${Month}/${year}`
   }
  },
  

  age(timestamp){
    const today = new Date()
    const datebirth = new Date(timestamp)

    let age = today.getFullYear() - datebirth.getFullYear()
    const month = today.getMonth() - datebirth.getMonth()
    
    if(age < 0 || 
      month == 0 && 
      today.getDate() <=  datebirth.getDate())
      age = age - 1

      return age
  },

  Datenow(timestamp){
    const today = new Date(timestamp)
    const datenow = `0${today.getDate()}`.slice(-2)
    const month = `$0${today.getMonth() + 1}`.slice(-2) 
    const year = today.getFullYear() 

    return `${datenow}-${month}-${year}`
  }


}