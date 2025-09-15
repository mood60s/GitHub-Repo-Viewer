function CreateElements() {
  let main = document.createElement('main');
  let header = document.createElement('header');
  let input = document.createElement('input');
  let button = document.createElement('button');
  let div = document.createElement("div");
  let span = document.createElement("span");
  let textSpan= document.createTextNode("No Data to Show");
  let textButton = document.createTextNode("Get Repos");

  input.type = 'text';
  input.setAttribute('placeholder', 'Github Username');
  header.className = 'get-repos';

  header.append(input);
  button.appendChild(textButton);
  header.appendChild(button);
  main.append(header);

  span.appendChild(textSpan);
  div.append(span);
  div.className = "show-data";
  main.append(div);

  document.body.append(main);
}

// ================== [ Main Variables ] ==================
let theInput, getButton, reposData;

// ================== [ Window Onload ] ==================
window.onload = _ => {
  CreateElements();

  theInput = document.querySelector('.get-repos input');
  getButton = document.querySelector('.get-repos button');
  reposData = document.querySelector('.show-data');

  getButton.addEventListener("click", getRepos);
}

// ================== [ Main Function ] ==================
function getRepos() {
  if (theInput.value.trim() === '') {
    reposData.innerHTML = '<span>Please Write Github Username..</span>';
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then(res => {
        if (!res.ok) throw new Error("User Not Found");
        return res.json();
      })
      .then(repos => {
        reposData.innerHTML = '';
        repos.forEach(repo => {
          let article = document.createElement('article');
          let repoName = document.createTextNode(repo.name);
          let container = document.createElement('div');

          article.appendChild(repoName);

          let theURL = document.createElement('a');
          theURL.textContent = 'Visit';
          theURL.href = `https://github.com/${theInput.value}/${repo.name}`;
          theURL.target = "_blank";

          container.appendChild(theURL);

          let starsSpan = document.createElement('span');
          starsSpan.textContent = `Stars: ${repo.stargazers_count}`;
          container.prepend(starsSpan);

          article.className = 'repo-Box';
          article.appendChild(container);
          reposData.appendChild(article);
        });
      })
      .catch(err => {
        reposData.innerHTML = `<span>${err.message}</span>`;
      });
  }
}
