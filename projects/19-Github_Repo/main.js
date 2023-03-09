// main variables 

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");




getButton.onclick = function() {
  getRepos()
}





// get Repos function

function getRepos() {
  
  if (theInput.value == '') { // If Value is Empty
    reposData.innerHTML = '<span>Please write a Valid Github UserName</span>';
  } else {
    
    
    fetch(`https://api.github.com/users/${theInput.value}/repos`).then((response) => response.json())

    .then((repos) => {
      // Empty the container
      reposData.innerHTML = '';

      // Loop on repositries
      repos.forEach(repo => {
        // Create the main div
        let mainDiv = document.createElement('div');
        let repoName = document.createTextNode(repo.name);
        mainDiv.appendChild(repoName);

        // create Repo Url tag
        let theUrl = document.createElement("a");
        let theUrlText = document.createTextNode("Visit");
        theUrl.appendChild(theUrlText);
        theUrl.href = `https://github.com/ElzeroWebSchool/${repo.name}`;
        theUrl.setAttribute('target', '_black') ;
        mainDiv.appendChild(theUrl);

        let starsSpan = document.createElement("span");
        let starsText = document.createTextNode(`Stars : ${repo.stargazers_count}`);
        starsSpan.appendChild(starsText);

        mainDiv.appendChild(starsSpan);

        mainDiv.className = 'repo-box';



        reposData.appendChild(mainDiv)
      });
    })


  }


}