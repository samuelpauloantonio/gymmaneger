
//Separando as funcoes do banco de dados das funcoes do controllers


const bancodeDados = require('../../config/db') 

const {
  date
} = require('../../lib/date')



module.exports = {
  
  all(callback){
    bancodeDados.query(` 
    SELECT instructors. * , COUNT(members) total_studente
    FROM instructors 
    LEFT JOIN members ON (members.instructors_id = instructors.id)
    GROUP BY instructors.id
    ORDER BY name DESC `, (err, results)=>{
      if(err) throw `erro com banco de dados no index ${err}`

      callback(results.rows)
      
    })
  },

  EnviadoParaBandoDados(dados, callback){
    
    const query = `
      INSERT INTO  instructors(
        url_avatar,
        name,
        birth,
        sex,
        services,
        date_now

      ) VALUES($1, $2, $3, $4, $5, $6)
      RETURNING id
    `
    

    const values = [

      dados.url_avatar,
      dados.name,
      date(dados.birth).iso,
      dados.sex,
      dados.services,
      date(Date.now()).iso
    ]

    bancodeDados.query(query, values, function(err, results){
      if(err)  throw `erro ao gravar os ficheiros no banco de dados ${err}`

      callback(results.rows[0].id)

    })
  },

  find(id, callback) {
    bancodeDados.query(`SELECT *
     FROM instructors
      WHERE id = $1`, [id], function(err, results){
      
      if(err) throw `database erro ${err} `

      callback(results.rows[0])
    })
  },

  update(data, callback){
    
    const query = `
    UPDATE instructors SET 
      
      url_avatar = ($1),
      name = ($2),
      birth = ($3),
      sex = ($4),
      services= ($5)

    WHERE  id = $6
   
    `

    const values = [

      data.url_avatar,
      data.name,
      date(data.birth).iso,
      data.sex,
      data.services,
      data.id
    ]

    bancodeDados.query(query, values, function(err, results){
      if(err) throw `database erro ${err} `

      callback()

    })
  },

  delete(id, callback){

    bancodeDados.query(`DELETE  FROM instructors WHERE id = $1`, [id], function(err, results){
      if(err) throw `database error ${err}`

      callback()
    })
  }
}