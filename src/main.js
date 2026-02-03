let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];



let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="220" height="220" src=${img} alt="">
      <div class="details">
        <h4 style="text-align:center; color:blue; font-family:arial;">${name}</h4>
        <p style="text-align:center; color:grey; font-family:arial;">${desc}</p>
        <div class="price-quantity">
          <h2 style="text-align:center; color:green; font-family:arial; ">₹ ${price} </h2>
          <div class="buttons">
          <button id="btn1"><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></button>
            <div id=${id} class="quantity" style="color:blue; font-family:arial; font-size:26px; font-weight:bolder;">${
        search.item === undefined ? 0 : search.item
      }</div>
          <button id="btn2"><i onclick="increment(${id})" class="bi bi-plus-lg"></i></button>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();



let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};



let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};



let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};



let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
