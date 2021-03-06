const bancodeDados = require('../../config/db')
const { date } = require('../../lib/date')


module.exports = {

  index(callback){
    bancodeDados.query(`SELECT * FROM members ORDER BY name ASC`, function(err, results){

      callback(results.rows)
    })
  },

  enviadodados_BD(dados, callback){
    const query = `
      INSERT INTO members (
        url_avatar,
        name, 
        email,
        birth,
        sex,
        blood,
        weight,
        height,
        instructors_id
      )VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9)
      RETURNING id
    `


    const values = [
      dados.url_avatar,
      dados.name,
      dados.email,
      date(dados.birth).iso,
      dados.sex,
      dados.blood,
      dados.weight,
      dados.height,
      dados.instructor
    ]


    bancodeDados.query(query, values, (err, results)=>{
      if(err) throw `erro ao salvar no banco de Dados ${err}`

      callback(results.rows[0])
    })
  },


  showMembers(id, callback){
    bancodeDados.query(`SELECT members.*, instructors.name AS instructor_name
    FROM members LEFT JOIN instructors ON (members.instructors_id = instructors.id)
     WHERE members.id = $1`, [id], function(err, results){
       
      if(err) throw `exibir members ${err}`

      callback(results.rows[0])
    })
  },


  update(dados, callback){

      const query = `
    UPDATE members  SET 

        url_avatar = ($1),
        name  = ($2), 
        email  = ($3),
        birth  = ($4),
        sex  = ($5),
        blood  = ($6),
        weight  = ($7),
        height  = ($8),
        instructors_id = ($9)

    WHERE id = $10
      
    `


    const values = [
      dados.url_avatar,
      dados.name,
      dados.email,
      date( dados.birth).iso,
      dados.sex,
      dados.blood,
      dados.weight,
      dados.height,
      dados.instructor,
      dados.id
    ]

    bancodeDados.query(query, values, function(err, results){
      if(err) throw `erro ao actualizar os banco de Dados ${err}`

      callback(results.rows)
    })
  },



  delete(id, callback){
    bancodeDados.query(`DELETE  FROM members WHERE id = $1`, [id], (err, results)=>{
      if(err) throw `erro ao deletar o members ${err}`
      
      callback()
    })
  }, 

  instructorsOptions(callback){

    bancodeDados.query(`SELECT name, id FROM instructors `, function(err, results) {
      if(err) throw `database error ${err} `

      callback(results.rows)
    })
  }

  
}