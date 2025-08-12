import debounce from 'lodash/debounce';
let currentPage = 1;
const limit = 10;
let totalCount = 50;
let currentQuery = '';


 const container = document.querySelector('.products-div');
   const btn = document.querySelector('.load-more');
const spinner = document.querySelector('.spinner');
const searchInput = document.getElementById('search');
  const clockEl = document.getElementById('clock');

function showSpinner(){
  spinner.classList.remove('hidden');
  spinner.setAttribute('aria-hidden', 'false')
}
function hideSpinner(){
  spinner.classList.add('hidden');
   spinner.setAttribute('aria-hidden', 'true');
}

function loadProducts({ reset = false } = {}) {
  if (reset) {
    currentPage = 1;
    container.innerHTML = '';
  }

  showSpinner();

  const base = 'http://localhost:3000/products';
  const params = new URLSearchParams();
  params.set('_page', currentPage);
  params.set('_limit', limit);
  if (currentQuery && currentQuery.trim() !== '') {
    params.set('q', currentQuery.trim());
  }

  fetch(`${base}?${params.toString()}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Помилка при завантаженні товарів');
      }
      totalCount = res.headers.get('X-Total-Count');
      return res.json();
    })
    .then(data => {
      renderProducts(data);
      checkButtonVisibility();
    })
    .catch(error => {
      console.error('Помилка:', error);
    })
    .finally(() => {
      hideSpinner();
    });

}


function renderProducts(products) {
  products.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('product-item');
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <p class="product-price">${product.price} UAH</p>
    `;
    container.appendChild(item);
  });
}

function updateClock() {
  
  const days = [
    'неділя', 'понеділок', 'вівторок', 'середа',
    'четвер', 'п’ятниця', 'субота'
  ];
  const months = [
    'січня', 'лютого', 'березня', 'квітня',
    'травня', 'червня', 'липня', 'серпня',
    'вересня', 'жовтня', 'листопада', 'грудня'
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const day = now.getDate();
  const monthName = months[now.getMonth()];
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
    if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  const formattedTime = `${dayName} ${day} ${monthName} ${hours}:${minutes}`;
  clockEl.textContent = formattedTime;
}
setInterval(updateClock, 1000 * 60);


function checkButtonVisibility() {
  const totalPages = Math.ceil(totalCount / limit);
  if (currentPage >= totalPages) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
}

document.querySelector('.load-more').addEventListener('click', () => {
  currentPage++;
  loadProducts();
});

const onSearch = debounce((e) => {
  const q = e.target.value;
  currentQuery = q;
  loadProducts({ reset: true });
}, 450);

searchInput.addEventListener('input', onSearch);

loadProducts();

updateClock();

