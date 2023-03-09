const stat1 = document.getElementById('v-1');
const stat2 = document.getElementById('v-2');
const stat3 = document.getElementById('v-3');

let stat1Value = 500;
let stat2Value = 17140;
let stat3Value = 1500;


window.addEventListener('DOMContentLoaded', getStats);


function getStats() {
  let counter1 = 0;
  let counter2 = 0;
  let counter3 = 0;

  const counterinterval = setInterval(function() {
    if (counter1 <= stat1Value) {
      stat1.textContent = counter1;
      counter1 += 1;
    } 
    if (counter2 <= stat2Value) {
      stat2.textContent = counter2;
      counter2 += 15;
    }
    if (counter3 <= stat3Value) {
      stat3.textContent = counter3;
      counter3 += 2;
    }
  }, 1);

  
}

