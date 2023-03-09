
const toggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

const closeBtn = document.querySelector('.close-btn');

toggle.addEventListener('click', function() {
  sidebar.classList.toggle('show-sidebar')
})

closeBtn.addEventListener('click', function() {
  sidebar.classList.remove('show-sidebar')
})