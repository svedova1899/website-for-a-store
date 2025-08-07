let currentPage = 1;
const limit = 6;



fetch('http://localhost:3000/products?_page=${page}&_limit=${limit}')
  .then(res => {
    if (!res.ok) {
      throw new error('Помилка при завантаженні товарів');
    }
    totalCount = res.headers.get('X-Total-Count');
    return res.json();
  })
  .then(data => {
    renderProducts(data);
    renderPagination();
  })
  .catch(error => {
    console.error('Помилка:', error);
  });
function renderProducts(products) {
  const container = document.querySelector('.products-div');
  container.innerHTML = "";
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
