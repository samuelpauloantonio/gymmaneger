const modal = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".childs-of-cards")
const bloco  = document.querySelector(".bloco")


for(let card of cards){
  card.addEventListener("click", function(){
    const idVideo = card.getAttribute("id")
     window.location.href=`/video_single?id=${idVideo}`
     bloco.classList.add("active")
  } )
};

const b = bloco.querySelector("#close").addEventListener("click", function(){
  
  window.location.href=`/video_single?id=${""}`
  return window.location.href=`/portifolio`
})
  




