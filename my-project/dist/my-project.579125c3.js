let currentPage = 1;
const limit = 10;
let totalCount = 50;
function loadProducts() {
    fetch(`http://localhost:3000/products?_page=${currentPage}&_limit=${limit}`).then((res)=>{
        if (!res.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u0456 \u0442\u043E\u0432\u0430\u0440\u0456\u0432");
        totalCount = res.headers.get('X-Total-Count');
        return res.json();
    }).then((data)=>{
        renderProducts(data);
        checkButtonVisibility();
    }).catch((error)=>{
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430:", error);
    });
}
function renderProducts(products) {
    const container = document.querySelector('.products-div');
    products.forEach((product)=>{
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
    if (currentPage >= totalPages) btn.style.display = 'block';
    else btn.style.display = 'none';
}
document.querySelector('.load-more').addEventListener('click', ()=>{
    currentPage++;
    loadProducts();
});
loadProducts();

//# sourceMappingURL=my-project.579125c3.js.map
