const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();


const futureDate = new Date(tempYear,tempMonth,tempDay+10,11,30,0);

const year = futureDate.getFullYear();
let month = months[futureDate.getMonth()];
const day = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();


giveaway.textContent = `giveaway ends on ${weekday}  ${day} ${month} ${year} ${hours}:${mins}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;

  let days = t/oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);
  
  function format(item) {
    if (item < 10) {
      return item = `0${item}`;
    }
    return item;
  }

  // set values array:
  const values = [days, hours, minutes, seconds];
  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  });
  if (t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

// countdown

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();



