let activities = [];
let currentPeriod = 'weekly';

const container = document.getElementById('container');
const periodButtons = document.querySelectorAll('.period-btn');

fetch('data.json').then((response) => {  
  if(!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}).then((data) => {
  activities = data;
  renderCards();
});


function renderCards() {
  const oldCards = document.querySelectorAll('.card');
  oldCards.forEach(card => card.remove());

  activities.forEach(item => {
    const timeframe = item.timeframes[currentPeriod]
    const card = `
      <div class="card">
        <div class="card-top">
          <img src="images/icon-${item.title.toLowerCase().replace(' ', '-')}.svg" alt="icon">
        </div>
        <div class="card-bottom">
          <div class="title">
            <h1>${item.title}</h1>
            <img src="images/icon-ellipsis.svg" alt="options">
          </div>
          <div class="time">
            <h1>${timeframe.current}hrs</h1>
            <span>Last ${getPreviousLabel()} - ${timeframe.previous}hrs</span>
          </div>
        </div>
      </div>
      `;

      container.insertAdjacentHTML('beforeend', card);
  });
}

function getPreviousLabel() {
  if (currentPeriod === 'daily') return 'Day';
  if (currentPeriod === 'weekly') return 'Week';
  if (currentPeriod === 'monthly') return 'Month';
}

periodButtons.forEach(button => {
  button.addEventListener('click', () => {
    periodButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    currentPeriod = button.textContent.toLowerCase();

    renderCards();
  });
});