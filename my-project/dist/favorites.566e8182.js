const container = document.querySelector('.products-div');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
if (favorites.length === 0) container.innerHTML = "<p>\u041D\u0435\u043C\u0430\u0454 \u0432\u0438\u0431\u0440\u0430\u043D\u0438\u0445 \u0442\u043E\u0432\u0430\u0440\u0456\u0432</p>";
else {
    const query = favorites.map((id)=>`id=${id}`).join('&');
    fetch(`http://localhost:3000/products?${query}`).then((res)=>res.json()).then((data)=>{
        data.forEach((product)=>{
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

//# sourceMappingURL=favorites.566e8182.js.map
