
const bancodeDados  = require('../../config/db_teatchers')

const  { date } = require('../../lib/date')
 



module.exports = {


  sendData_post(dados, callback){
    const query = `
      INSERT INTO students (
        url_avatar,
        name, 
        email,
        birth,
        sex,
        blood,
        weight,
        height
      ) VALUES( $1, $2, $3, $4, $5, $6, $7, $8 )
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
    ]


    bancodeDados.query(query,values, (err, results)=> {
      if(err) throw `database error ${err}`

      callback(results.rows[0].id)
    })

  },

  showStudent_Index(callback){
    bancodeDados.query(`SELECT * FROM students`,(err, results)=>{
      if(err) throw `erro ao exiber students ${err}`
      
      callback(results.rows)
    } )
  },

  showStudent_single(id, callback){
    bancodeDados.query(`SELECT * FROM students WHERE id = $1`, [id], (err, results) => {
      if(err) throw `erro ao  buscar um estudante do base de dados ${err}`
      
      callback(results.rows[0])
    })
  },


  updateStudant(dados, callback){

    const query = `

    UPDATE students SET 

      url_avatar = ($1),
      name = ($2), 
      email = ($3),
      birth = ($4),
      sex = ($5),
      blood = ($6) ,
      weight= ($7) ,
      height = ($8)

    WHERE id = $9
    
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
      dados.id
  ]


  bancodeDados.query(query,values, (err, results)=> {
    if(err) throw `database update error ${err}`

    callback(results.rows[0])
  })
  },


  delete(id, callback){
    bancodeDados.query(` DELETE FROM students WHERE id = $1`, [id], (err,results) =>{
      if(err)  throw `erro ao deletar da base de Dados ${err}`

      callback()
    })
  }




  
}