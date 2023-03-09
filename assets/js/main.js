/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]'),
      projectsArea = document.getElementById('projects'),
      footer = document.querySelector('.footer__copy');

tabs.forEach(tab => {

  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach(tc => { /* tc = tabContent*/
      tc.classList.remove('filters__active');
    })
    target.classList.add('filters__active');

    tabs.forEach(t => {
      t.classList.remove('filter-tab-active');
    })

    tab.classList.add('filter-tab-active');

    if (target.id == 'projects') {
      footer.classList.add('active');
    } else {
      console.log('hi');
      footer.classList.remove('active');
    }
  })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeButton.classList.toggle('ri-sun-line');
  themeButton.classList.toggle('ri-moon-line');
})



/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
  origin: 'top',
  distance: '70px',
  duration: 2500,
  delay: 400
})

sr.reveal(`.profile__border`);
sr.reveal(`.profile__name`, {delay: 500});
sr.reveal(`.profile__proffession`, {delay: 600});
sr.reveal(`.profile__social`, {delay: 700});
sr.reveal(`.profile__info-group`, {interval:100, delay: 700});
sr.reveal(`.profile__buttons`, {delay: 800});
sr.reveal(`.filters__content`, {delay: 900});
sr.reveal(`.filters`, {delay: 1000});


/*=============== Fetching Projects ===============*/

let myProjectsArr = [];

fetch("../../project.json")
    .then(response => response.json())
    .then(data => {
      let projects = {};

      for (let key in data) {
        projects[key] = data[key];
      }
      myProjectsArr = Object.values(projects);

      addProject(myProjectsArr);

    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

async function addProject(arr) {

  let max = arr.length > 10 ? 10 : arr.length;

  for (let i = 0; i < max; i++) {

    const project = document.createElement('article');
    project.className = 'projects__card';

    project.innerHTML = `
    <img src="${arr[i].img}" alt="${arr[i].name}-image" class="projects__img">
  
    <div class="projects__modal">
      <div>
        <h3 class="projects__title">${arr[i].name}</h3>
        <p class="projects__subtitle">${arr[i].details}</p>
        <a href="${arr[i].liveUrl}" class="projects__button button button__small">
          <i class="ri-link"></i>
        </a>
        <a href="${arr[i].repoUrl}" class="projects__button button button__small">
          <i class="ri-github-line"></i>
        </a>
      </div>
    </div>
    `;
    projectsArea.appendChild(project);
  }

  myProjectsArr.splice(0, max);
  
  if (myProjectsArr.length != 0) {
    loadMore(myProjectsArr);
  } else {
    gobackUp();
  }
}

function loadMore(arr) {
  footer.textContent = "Load older Projects";

  footer.addEventListener('click', () => {
    addProject(arr);
  })
}

function gobackUp() {
  footer.textContent = "Go back UP";

  footer.addEventListener('click', () => {
    window.scrollTo({
      left: 0,
      top: 0
    });
  })
}

