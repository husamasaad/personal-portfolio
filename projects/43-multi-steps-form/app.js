// Selecting Elements

const forms = [...document.querySelectorAll('.form')];
const footer = document.getElementById('footer')
const submit = document.getElementById('next-btn');
const goBack = document.getElementById('go-back');
const title = document.getElementById('step-title');
const stepInfo = document.getElementById('step-info');
const steps = [...document.querySelectorAll('.step-i')];
const chng = document.getElementById('change');

// for step 1
const personalInfo = [...document.querySelectorAll('.step-1')];
const labels = [...document.querySelectorAll('.label')];

// for step 2
const options = [...document.querySelectorAll('.radio > div')];
const type = document.getElementById('type');

// for step 3
const adds = [...document.querySelectorAll('.checkbox .box')];
const addsInput = [...document.querySelectorAll('.checkbox .box input[type="checkbox"]')];



const pricesObj = {
  Arcade: {
    Yearly: 90,
    Monthly: 9
  },
  Advance: {
    Yearly: 120,
    Monthly: 12
  },
  Pro: {
    Yearly: 150,
    Monthly: 15
  }
}


// Setup
let currentStep = 0; // 0 => first step
let userName = "";
let userEmail = "";
let userPhone = "";
let plan = "";
let planType = "";

// Add-ons
let os = false; // Online Service
let ls = false; // Larger storage
let cp = false; // Customizable profile

updateData();

submit.onclick = () => {
  // first Step
  if (currentStep == 0){
    formValidation();
  }

  // second Step
  else if (currentStep == 1) {
    getSelected();
  }

  // Third Step
  else if (currentStep == 2) {
    getAddOns();
  }

  // Fourth Step
  else if (currentStep == 3) {
    goNext();
  }

}


// Go to next step
function goNext() {
  forms[currentStep].classList.remove('active');
  steps[currentStep].classList.remove('active');
  currentStep++;
  if (currentStep < forms.length) {
    forms[currentStep].classList.add('active');
    if (currentStep < forms.length-1){
      steps[currentStep].classList.add('active');
    }
    updateData();
  }
}

// updating data
function updateData() {
  submit.textContent = "Next step";
  switch (currentStep){
    case 1:
      title.textContent = "Select your plan";
      stepInfo.textContent = "you have the option of monthly or yearly billing.";
      goBack.style.visibility = "visible";
      break;
    case 2:
      title.textContent = "Pick add-ons";
      stepInfo.textContent = "Add-ons help enhance your gaming experienc.";
      break;
    case 3:
      title.textContent = "Finishing up";
      stepInfo.textContent = "Double-check everything looks OK before confirming.";
      submit.textContent = "Confirm";
      break;
    case 4:
      title.remove();
      stepInfo.remove();
      footer.remove();
      break;
  }
}


// Step one form
function formValidation() {
  let valid = false;
  // validation of email:
  let emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (personalInfo[1].value != "" && !emailRe.test(personalInfo[1].value)) {
    if (labels[1].querySelector("span")) {
      labels[1].querySelector("span").remove();
    }
    let msg = document.createElement("span");
      msg.textContent = "Invalid Input";
      labels[1].appendChild(msg);
  }
  // Validation of phone number
  let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (personalInfo[2].value != "" && !phoneRe.test(personalInfo[2].value)) {
    if (labels[2].querySelector("span")) {
      labels[2].querySelector("span").remove();
    }
    let msg = document.createElement("span");
      msg.textContent = "Invalid Input";
      labels[2].appendChild(msg);
  }
  // Check if Empty
  personalInfo.forEach((info, i) => {
    if (info.value == "") {
      if (labels[i].querySelector("span")) {
        labels[i].querySelector("span").remove();
      }
      let msg = document.createElement("span");
      msg.textContent = "This fuild is required";
      labels[i].appendChild(msg);
      info.addEventListener('focus', () => {
        if (labels[i].querySelector("span")) {
          labels[i].querySelector("span").remove();
        }
      })
    }
  })

  // is it valid ?
  if (emailRe.test(personalInfo[1].value) && phoneRe.test(personalInfo[2].value)) {
    valid = true;
  }

  if (valid) {
    userName = personalInfo[0].value;
    userEmail = personalInfo[1].value;
    userPhone = personalInfo[2].value;
    goNext();
  }
}

// Step two

options.forEach((opt) => {
  opt.onclick = () => {
    if (!opt.classList.contains('checked')) {
      options.forEach((op) => {
        op.classList.remove('checked');
      })
      opt.classList.add('checked');
    }
  }
})

type.onchange = () => {
  
  if (type.checked) {
    let prices = [...document.querySelectorAll('.radio .price')];
    let gifts = [...document.querySelectorAll(".gift")];

    prices[0].textContent = "$90/yr";
    prices[1].textContent = "$120/yr";
    prices[2].textContent = "$150/yr";

    gifts.forEach(gift => {
      gift.classList.remove('show');
    })
  } else {
    let prices = [...document.querySelectorAll('.radio .price')];
    let gifts = [...document.querySelectorAll(".gift")];

    prices[0].textContent = "$9/mo";
    prices[1].textContent = "$12/mo";
    prices[2].textContent = "$15/mo";

    gifts.forEach(gift => {
      gift.classList.add('show');
    })
  }
}

function getSelected() {
  if (type.checked) {
    planType = "Yearly";
  } else {
    planType = "Monthly";
  }

  options.forEach((opt, index) => {
    if (opt.classList.contains('checked')) {
      plan = opt.querySelector('.text label').textContent
    }
  })
  goNext();
  updatePlan();
}

function updatePlan() {
  let prices = [...document.querySelectorAll('.checkbox .price')];

  if (planType == 0) {
    prices[0].textContent = "+$1/mo";
    prices[1].textContent = "+$2/mo";
    prices[2].textContent = "+$2/mo";
  }
  else if (planType == 1) {
    prices[0].textContent = "+$10/yr";
    prices[1].textContent = "+$20/yr";
    prices[2].textContent = "+$20/yr";
  }
}

// Step 3

addsInput.forEach((input, i) => {
  input.onchange = () => {
    if (input.checked) {
      adds[i].classList.add("checked")
    }
    else {
      adds[i].classList.remove("checked")
    }
  }
})

adds.forEach((add, i) => {
  add.onclick = () => {
    addsInput[i].click();
  }
})

function getAddOns() {
  os = addsInput[0].checked;
  ls = addsInput[1].checked;
  cp = addsInput[2].checked;

  updateSumm();
  goNext();
}

function updateSumm() {
  document.getElementById('result-plan').textContent = `${plan} (${planType})`;
  let prices = [...document.querySelectorAll('.f-price')];
  let suf = planType == "Monthly" ? "mo": "yr";
  let stepForm = document.getElementById("step-4");
  let tot= 0;

  prices[0].textContent = `$${pricesObj[plan][planType]}/${suf}`;

  tot += pricesObj[plan][planType];

  if (os) {
    let box = document.createElement('div');
    box.className = "box";

    if (planType == "Monthly") {
      box.innerHTML = `
      <div class="text">
        <span class="f-add">Online service</span>
      </div>
      <span class="f-price add">+$1/mo</span>
      `;
      tot += 1;
    } else {
      box.innerHTML = `
      <div class="text">
        <span class="f-add">Online service</span>
      </div>
      <span class="f-price add">+$10/yr</span>
      `;
      tot += 10;
    }

    stepForm.appendChild(box);
  }
  if (ls) {
    let box = document.createElement('div');
    box.className = "box";

    if (planType == "Monthly") {
      box.innerHTML = `
      <div class="text">
        <span class="f-add">Larger storage</span>
      </div>
      <span class="f-price add">+$2/mo</span>
      `;
      tot+= 2;
    } else {
      box.innerHTML = `
      <div class="text">
        <span class="f-add">Local storage</span>
      </div>
      <span class="f-price add">+$20/yr</span>
      `;
      tot += 20;
    }

    stepForm.appendChild(box);
  }
  if (cp) {
    let box = document.createElement('div');
    box.className = "box";

    if (planType == "Monthly") {
      box.innerHTML = `
      <div class="text">
        <span class="f-add">Customizable profile</span>
      </div>
      <span class="f-price add">+$1/mo</span>
      `;
      tot += 2;
    } else {
      box.innerHTML = `
      <div class="text">
        <span class="f-add">Customizable profile</span>
      </div>
      <span class="f-price add">+$10/yr</span>
      `;
      tot += 20;
    }

    stepForm.appendChild(box);
  }

  let lastbox = document.createElement('div');
      lastbox.className = "box";
      if (planType == "Monthly") {
        lastbox.innerHTML = `
        <div class="text">
            <span class="f-add">Total (per month)</span>
        </div>
        <span class="f-price tot">${tot}/${suf}</span>
        `;
      } else {
        lastbox.innerHTML = `
        <div class="text">
            <span class="f-add">Total (per year)</span>
        </div>
        <span class="f-price tot">${tot}/${suf}</span>
        `;
      }
      stepForm.appendChild(lastbox);
}

// change button
chng.addEventListener('click', reseting);

function reseting() {
  let stepForm = document.getElementById("step-4");
  forms[currentStep].classList.remove('active');
  steps[currentStep].classList.remove('active');
  stepForm.innerHTML = `
  <div class="box">
  <div class="text">
    <span id="result-plan" class="f-plan">Arcade (Monthly)</span>
    <span id="change">Change</span>
  </div>
  <span class="f-price">$90/yr</span>
</div>
  `;
  document.getElementById('change').addEventListener('click', reseting);
  currentStep = 0;
  goNext();
}

// Go back btn
goBack.onclick = () => {
  console.log('hi');
  forms[currentStep].classList.remove('active');
  steps[currentStep].classList.remove('active');
  currentStep--;
  if (currentStep >= 0) {
    forms[currentStep].classList.add('active');
    if (currentStep < forms.length-1){
      steps[currentStep].classList.add('active');
    }
    if (currentStep == 0) {
      goBack.style.visibility = "hidden";
    }
    let stepForm = document.getElementById("step-4");
    stepForm.innerHTML = `
    <div class="box">
      <div class="text">
        <span id="result-plan" class="f-plan">Arcade (Monthly)</span>
        <span id="change">Change</span>
      </div>
      <span class="f-price">$90/yr</span>
    </div>
    `;
    document.getElementById('change').addEventListener('click', reseting);
    updateData();
  }
}