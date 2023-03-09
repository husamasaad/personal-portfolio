// Variables 

let openBtn = document.getElementById('open-btn');
let modelContainer = document.getElementById('model-container');
let closeBtn = document.getElementById('close-btn');


openBtn.addEventListener('click', function () {
  modelContainer.style.display = 'block';
})

closeBtn.addEventListener('click', function () {
  modelContainer.style.display = 'none';
})

window.addEventListener('click', function (e) {
  if (e.target === modelContainer) {
    modelContainer.style.display = 'none';
  }
})