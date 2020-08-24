const currentPage = document.location.pathname
const links = document.querySelectorAll('.header-index nav ul li a')

for(let link of links){
 
 if(currentPage.includes(link.getAttribute('href'))) {
   
   link.classList.add('active')
 }

}
