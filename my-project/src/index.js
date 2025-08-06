fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(data => {
    renderProducts(data);
  });

function renderProducts(products) {
  const container = document.querySelector('.product-list');
  container.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} грн</p>
      <button data-id="${product.id}">Купити</button>
    </div>
  `).join('');
}