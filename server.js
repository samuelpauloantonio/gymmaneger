//configurar o servidor

const express  = require("express")
const nunjucks = require("nunjucks")
const methodOverride = require('method-override')
const routes = require('./Routes')


const server = express()


server.set("view engine", "njk")

nunjucks.configure("views", {
  express : server,
  autoescape:false,
  noCache:true
})




server.use(express.urlencoded({ extended : true}))

server.use(express.static("public/img"))
server.use(express.static("public/videos"))
server.use(express.static("controllers"))
server.use(express.static("public/css"))

server.use(methodOverride('_method'))
server.use(routes)

/*server.use(function(req, res){
  return res.status(404).render("not_found")
}) */



server.listen(2000, function(){
  console.log("servidor is running")
})
