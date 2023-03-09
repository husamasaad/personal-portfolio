const images = [...document.querySelectorAll('.img-box img')];
const screenGallery = document.getElementById('gallery');
const scImg = document.getElementById('sc-img');
const scImages = document.getElementById('sc-images');
const closeBtn = document.getElementById('close-btn');
const nextBtn = document.getElementById('ar-right');
const prevBtn = document.getElementById('ar-left');
const imgTitle = document.getElementById('img-title');

// settings
let currentIndex;

// Events

images.forEach((img) => {
  img.onclick = function() {
    updateImages(img);
    screenGallery.classList.add('show');
  };
});

closeBtn.onclick = function() {
  scImages.innerHTML = '';
  screenGallery.classList.remove('show');
}

nextBtn.onclick = function() {
  nextImg();
}

prevBtn.onclick = function() {
  prevImg();
}




// Fucntions


function updateImages(pic) {
  let cat = pic.parentElement.parentElement.id;
  scImg.src = pic.src
  let ScImages = [...document.getElementById(cat).children];
  ;
  imgTitle.textContent = pic.dataset.name;
  let newList = ScImages.map((item) => 
  {
    return item.children[0];
  })
  newList.forEach((img, i) => {
    let newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.dataset.name = img.dataset.name;
    if (img == pic) {
      currentIndex = i;
      newImg.classList.add('selected');
    }
    scImages.appendChild(newImg);
  })
}

function nextImg() {
  let ScreenImages = document.getElementById('sc-images').children;
  removeSelected();
  let nextImage = (currentIndex + 1) < ScreenImages.length ? (currentIndex + 1) : 0;
  imgTitle.textContent = ScreenImages[nextImage].dataset.name;
  ScreenImages[nextImage].classList.add('selected');
  slideImage()
}

function prevImg() {
  let ScreenImages = document.getElementById('sc-images').children;
  removeSelected();
  let prevImage = (currentIndex - 1) >= 0 ? (currentIndex - 1) : ScreenImages.length - 1;
  imgTitle.textContent = ScreenImages[prevImage].dataset.name;
  ScreenImages[prevImage].classList.add('selected');
  slideImage();
}

function removeSelected() {
  [...document.getElementById('sc-images').children].forEach((img, i) => {
    if (img.classList.contains('selected')) {
      currentIndex = i;
      img.classList.remove('selected');
    }
  });
}

function slideImage() {
  [...document.getElementById('sc-images').children].forEach((img) => {
    if (img.classList.contains('selected')) {
      scImg.src = img.src;
    }
  });
}