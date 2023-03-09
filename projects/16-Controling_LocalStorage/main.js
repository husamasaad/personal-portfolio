

let allSpans = document.querySelectorAll(".buttons span");
let results = document.querySelector(".results > span");
let theInput = document.getElementById("the-input");

allSpans.forEach(span => {
  span.addEventListener('click', (e) => {
    if (e.target.classList.contains('check')) {
      checkItem();
    }
    if (e.target.classList.contains('add')) {
      addItem();
    }
    if (e.target.classList.contains('delete')) {
      deleteItem();
    }
    if (e.target.classList.contains('show')) {
      showItems();
    }
  })
})

function showMsg() {
    results.innerHTML = 'Input cant be Empty'
  
}

function checkItem() {
  
  if (theInput.value !== '') {

    if (localStorage.getItem(theInput.value)) {
      results.innerHTML = `Found Local Item Called <span>${theInput.value}</span>`
    } else {
      results.innerHTML = `did't Find Local Item Called <span>${theInput.value}</span>`
    }

  } else {
    showMsg();
  }

}

function addItem() {
  if (theInput.value !== '') {

    localStorage.setItem(theInput.value, "Test");

    results.innerHTML = `Local Item <span>${theInput.value}</span> Added!`

  } else {
    showMsg();
  }
}

function deleteItem() {
  if (theInput.value !== '') {

    if (localStorage.getItem(theInput.value)) {

      localStorage.removeItem(theInput.value)
      results.innerHTML = `Local Item <span>${theInput.value}</span> Deletes!`
    } else {
      results.innerHTML = `did't Find Local Item Called <span>${theInput.value}</span>`
    }
    
  } else {
    showMsg();
  }
}

function showItems() {
  if (localStorage.length !== 0) {
    console.log(`Found Element ${localStorage.length}`);
    results.innerHTML = ''
    for (let [key, value] of Object.entries(localStorage)) {
      results.innerHTML += `<span>${key.toUpperCase()} </span>`
    }
  } else {
    results.innerHTML = 'Local Storage is Empty'
  }
}