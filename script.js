import { challenges } from './data.js';

function createCard(item) {
  const cards = document.getElementById('cards');
  const url = `./${item.name}`;
  const image = `./${item.name}/design/desktop-preview.jpg`;
  const repo = `https://github.com/porumbachanov/Frontend-Mentor-Challenges/tree/main/${item.name}`;

  const cardHTML = `
    <li class="card">
        <div class="image">
            <img src="${image}"/>
        </div>
        <article class="card-content">
            <h2>
                <a href="${url}" target="_blank">${item.title}</a>
            </h2>
            <small>
                <a href="${repo}" target="_blank">Github repo</a>
            </small>
        </article>
    </li>`;

  cards.insertAdjacentHTML('beforeend', cardHTML);
}

function loadData() {
  [...challenges]
  .sort((a, b) => b.id - a.id)
  .forEach((item) => {
    createCard(item);
  });
}

loadData();
