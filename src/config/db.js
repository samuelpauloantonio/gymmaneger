const { Pool } = require('pg')

module.exports = new Pool({
  name:"SPA_Corporation",
  password:51053455,
  host:"localhost",
  port:5432,
  database:"gymmaneger"

})