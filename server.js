//configurar o servidor

const express  = require("express")
const nunjucks = require("nunjucks")
const routes = require('./Routes')


const server = express()


server.set("view engine", "njk")

nunjucks.configure("views", {
  express : server,
  autoescape:false,
  noCache:true
})




server.use(express.urlencoded({ extended : true}))

server.use(routes)
server.use(express.static("public/img"))
server.use(express.static("public/videos"))
server.use(express.static("public/js"))
server.use(express.static("public/css"))

server.use(function(req, res){
  return res.status(404).render("not_found")
}) 



server.listen(5000, function(){
  console.log("servidor is running")
})
