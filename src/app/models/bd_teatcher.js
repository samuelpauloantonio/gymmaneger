const {date} = require('../../lib/date')
const bdTeatchers = require('../../config/db_teatchers')

module.exports = {

  allTeatchers(callback){
    bdTeatchers.query(`
    
    SELECT teatchers .*, 
    count(students) as total_students 
    FROM teatchers LEFT JOIN students
    ON (students.teatchers_id = teatchers.id)  
    group BY teatchers.id  
    order by  teatchers.id`, function(err, results){
      if(err) throw `database error ${err}`

      callback(results.rows)
    })
  },

  filter(filter, callback){
    bdTeatchers.query(`
    SELECT teatchers .*, 
    count(students) as total_students 
    FROM teatchers LEFT JOIN students
    ON (students.teatchers_id = teatchers.id)  
    WHERE teatchers.name ILIKE '%${filter}%' 
    or teatchers.typeofclass ILIKE '%${filter}%'
    
    group BY teatchers.id  ` , (err, results)=> {
      if(err) throw `ERROR ao filtrar a bancode Dados ${err}`
      
      callback(results.rows)
    })
  },

  insertIntoDB(dados, callback){
    
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

      dados.url_avatar,
      dados.name,
      date(dados.birth).iso,
      dados.sex,
      dados.school,
      dados.typeofclass,
      dados.lesson
      
    ]


    bdTeatchers.query(query, values, function(err, results) {

      if(err)  throw `erro ao gravar os ficheiros no banco de dados ${err}`

      callback(results.rows[0])

    })
  },




  showTeacher(id, callback){

    bdTeatchers.query(`SELECT *
     FROM teatchers 
     WHERE id = $1`, [id] , function(err, results){

      if(err) throw `erro ao mostrar o teactcher ${err} `

      callback(results.rows[0])
    })
  },


  update(data, callback){

    const query = `
      UPDATE teatchers SET 

        url_avatar = ($1),
        name = ($2),
        birth = ($3),
        sex = ($4),
        school = ($5),	
        typeofclass = ($6),	
        lesson = ($7)

      WHERE id  = $8
    `

     const values = [
       data.url_avatar,
       data.name,
       date(data.birth).iso,
       data.sex,
       data.school,
       data.typeofclass,
       data.lesson,
       data.id
       
     ]

     bdTeatchers.query(query, values, function(err, results){
       if(err) throw `erro ao actualizar os ficheiros ${err}`
       
        callback(results.rows[0])
     })
  },

  delete(id, callback){
    bdTeatchers.query(`DELETE FROM teatchers WHERE id = $1`, [id], function(err, results){
      if(err) throw `erro ao deletar o teatcher ${err}`
      callback()
    })
  }






}