let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />

        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p style="color:blue;">${name}</p>
              <p class="cart-item-price">₹ ${price}</p>
            </h4>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button id="cut"><h2><i onclick="removeItem(${id})" class="bi bi-x-lg"></i></h2></button>
          </div>

          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>

          <h3 style="color:red; font-weight:bold;">₹ ${item * price}</h3>
        
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h1 style="color:red";>CART IS EMPTY</h1>
    <a href="index.html">
      <button class="HomeBtn"><h2>CLICK FOR BACK</h2></button>
    </a>
    `;
  }
};

generateCartItems();

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

  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2 style="color:grey; font-size:25px;">TOTALL PAY AMOUNT BILL =&nbsp;
    <b style="color:red; font-size:30px;">₹ ${amount}</h2></b>
    <button class="checkout"><h3>BUY NOW</h3></button>
    <button onclick="clearCart()" class="removeAll"><h3>REMOVE<h3></button>
    `);
  } else return;
};

TotalAmount();

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};