const views = document.getElementById('pageviews');
const amount = document.getElementById('amount');
const pundle = document.getElementById('type');
const toggle = document.querySelector('.checkbox');
const slider = document.getElementById('slider');

let pageViews = ["10K", "50K", "100K", "500K", "1M"];
let prices = [8.00, 12.00, 16.00, 24.00, 36.00]


slider.addEventListener('input', () => {
  updateValus();

  let value = slider.value * 25;
  slider.style.background =  `
  linear-gradient(
    to right,
    hsl(174, 77%, 80%) 0%,
    hsl(174, 77%, 80%) ${value}%,
    hsl(224, 65%, 95%) 0%,
    hsl(224, 65%, 95%) 100%
  )
  `
})

toggle.addEventListener('click', () => {
  if (pundle.value == "on") {
    pundle.value = "off";
    updateValus();
    toggle.classList.add('active');
  }
  else {
    pundle.value = "on";
    updateValus();
    toggle.classList.remove('active');
  }
})

function updateValus() {
  views.textContent = pageViews[slider.value];

  if (pundle.value == "on") {
    amount.textContent = `$${prices[slider.value].toFixed(2)}`;
  }
  if (pundle.value == "off") {
    amount.textContent = `$${(prices[slider.value] * 0.75).toFixed(2)}`;
  } 
}