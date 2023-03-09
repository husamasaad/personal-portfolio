//  Get slider Items

var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));

// Get number of slides 
var slidesCount = sliderImages.length;

// Set current Slide Index

var currentSlide = 1;


// Slide Number string Element 

var slideNumberElement = document.getElementById("slide-number");

// Prev and Next Buttons

var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');


// Handle Click on prev & next buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;


// Create main ul Element
var paginationElement = document.createElement('ul');
// Set Id on created element
paginationElement.setAttribute("id", "pagination-ul");

// Create list items based on slides count

for (var i = 1; i <= slidesCount; i++) {
  var paginationItem = document.createElement('li');
  paginationItem.setAttribute("data-index", i);
  paginationItem.appendChild(document.createTextNode(i));
  paginationElement.appendChild(paginationItem);
}

document.getElementById('indicators').appendChild(paginationElement);


// Get the new created Ul

var paginationCreatedUl = document.getElementById('pagination-ul');

var paginationBullets = Array.from(document.querySelectorAll('#pagination-ul li'))

// Trigger the checker funciton

theChecker()

// Next slide function
function nextSlide() {

  if (nextButton.classList.contains("disabled")) {
    return false
  } else {
    currentSlide =  currentSlide + 1;
    theChecker()
  }
}

// Previious slide function
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    return false
  } else {
    currentSlide =  currentSlide + 1;
    theChecker()
  }
  
}

// Create the checker function

function theChecker() {

  slideNumberElement.textContent = 'slide #' + (currentSlide) + ' of ' + (slidesCount);

  removeAllActive();

  // Set active class on current slide
  sliderImages[currentSlide - 1].classList.add('active');
  // set Active Class on current pagination Items
  paginationCreatedUl.children[currentSlide - 1].classList.add('active');

  // Check if current Slide is the first 

  if (currentSlide == 1) {
    prevButton.classList.add('disabled');
  } else {
    prevButton.classList.remove('disabled');
  }

    // Check if current Slide is the last
  if (currentSlide == slidesCount) {
    nextButton.classList.add('disabled');
  } else {
    nextButton.classList.remove('disabled');
  }

}

// remove all active classes 

function removeAllActive() {
  // loop thorugh images
  sliderImages.forEach(img => {
    img.classList.remove("active")
  });

  paginationBullets.forEach(bullet => {
    bullet.classList.remove("active")
  });
}