let currentPage = 1;
const limit = 10;
let totalCount = 50;

function loadProducts() {
  fetch(`http://localhost:3000/products?_page=${currentPage}&_limit=${limit}`)
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
    });
}

function renderProducts(products) {
  const container = document.querySelector('.products-div');
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

function checkButtonVisibility() {
  const totalPages = Math.ceil(totalCount / limit);
  const btn = document.querySelector('.load-more');
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

loadProducts();
