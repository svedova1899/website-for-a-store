const container = document.querySelector('.products-div');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

if (favorites.length === 0) {
  container.innerHTML = '<p>Немає вибраних товарів</p>';
} else {

  const query = favorites.map(id => `id=${id}`).join('&');
  
  fetch(`http://localhost:3000/products?${query}`)
    .then(res => res.json())
    .then(data => {
      data.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('product-item');
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <h3>${product.name}</h3>
          <p>${product.price} UAH</p>
        `;
        container.appendChild(item);
      });
    });
}