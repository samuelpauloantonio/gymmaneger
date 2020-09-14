const {date} = require('../../lib/date')
const bdTeatchers = require('../../config/db.teatchers')

module.exports = {

  allTeatchers(callback){
    bdTeatchers.query(`SELECT * FROM teatchers`, function(err, results){
      if(err) throw `database error ${err}`

      callback(results.rows)
    })
  },

  insertIntoDB(data, callback){
    
    const query = `
    INSERT INTO teatchers (
      url_avatar,
      name,
      birth,
      sex,
      school,
      typeofclass,
      lesson
    ) VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING id 
  `
    const values  = [

      data.url_avatar,
      data.name,
      date(data.birth).iso,
      data.sex,
      data.school,
      data.typeofclass,
      data.lesson
      
    ]


    bdTeatchers.query(query, values, (err, results)=>{
      if(err) throw `erro ao salvar no banco de Dados ${err}`

     callback(results.rows[0].id)

    })
  },

  showTeacher(id, callback){

    bdTeatchers.query(`SELECT * FROM teatchers WHERE id = $1`, [id] , function(err, results){
      if(err) throw `database error ${err}`

      callback(results.rows[0])
    })
  }






}