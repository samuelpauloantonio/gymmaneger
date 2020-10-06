const currentpage = document.location.pathname
const linkspage = document.querySelectorAll('.header-index nav ul li > a')

for(let links of linkspage){
  if(currentpage.includes(links.getAttribute('href'))){

    links.classList.add('active')
  }
}


//Paginate 


//totalpages = 20
//selected pages = 15  [1...13,14, 15, 16,17.... 20]

//pages []




 
  