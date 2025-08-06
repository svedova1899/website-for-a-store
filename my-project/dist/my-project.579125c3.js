fetch('http://localhost:3000/products').then((res)=>res.json()).then((data)=>{
    renderProducts(data);
});
function renderProducts(products) {
    const container = document.querySelector('.product-list');
    container.innerHTML = products.map((product)=>`
    <div class="card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} \u{433}\u{440}\u{43D}</p>
      <button data-id="${product.id}">\u{41A}\u{443}\u{43F}\u{438}\u{442}\u{438}</button>
    </div>
  `).join('');
}

//# sourceMappingURL=my-project.579125c3.js.map
