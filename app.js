let cartItemsArray = [];

// Display Search Box

$(document).ready(function () {
  $(".bi-search").click(function (e) {
    $(".search-box").toggleClass("display");
  });
});

// Auto Complete

$(function () {
  var availableTags = [
    "Classic Burger",
    "Turkey Burger",
    "Chicken Burger",
    "Cheese Burger",
    "Bacon Burger",
    "Shawarma Burger",
    "Olive Burger",
    "Double-Cheese Burger",
    "Crispy Chicken Burger",
    "Paneer Burger",
    "Crispy Chicken Submarine",
    "Chicken Submarine",
    "Grinder Submarine",
    "Cheese Submarine",
    "Double Cheese n Chicken Submarine",
    "Special Horgie Submarine",
    "MOS Special Submarine",
    "Steak Fries",
    "French Fries",
    "Sweet Potato Fries",
    "Chicken n Cheese Pasta",
    "Chicken Penne Pasta",
    "Ground Turkey Pasta Bake",
    "Creamy Shrimp Pasta",
    "Lemon Butter Pasta",
    "Tagliatelle Pasta ",
    "Baked Ravioli",
    "Fried Chicken",
    "Hot Wings",
    "Devilled Chicken",
    "BBQ Chicken",
    "Pepsi",
    "Coca-Cola",
    "Sprite",
    "Mirinda",
  ];
  $("#search").autocomplete({
    source: availableTags,
  });
});

// Search Items

function search() {
  let menuItemsArray = [
    "Classic Burger (Large)",
    "Classic Burger (Regular)",
    "Turkey Burger",
    "Chicken Burger (Large)",
    "Chicken Burger (Regular)",
    "Cheese Burger (Large)",
    "Cheese Burger (Regular)",
    "Bacon Burger",
    "Shawarma Burger",
    "Olive Burger",
    "Double-Cheese Burger",
    "Crispy Chicken Burger (Regular)",
    "Crispy Chicken Burger (Large)",
    "Paneer Burger",
    "Crispy Chicken Submarine (Large)",
    "Crispy Chicken Submarine (Regular)",
    "Chicken Submarine (Large)",
    "Chicken Submarine (Regular)",
    "Grinder Submarine",
    "Cheese Submarine",
    "Double Cheese n Chicken Submarine",
    "Special Horgie Submarine",
    "MOS Special Submarine",
    "Steak Fries (Large)",
    "Steak Fries (Medium)",
    "French Fries (Large)",
    "French Fries (Medium)",
    "French Fries (Small)",
    "Sweet Potato Fries (Large)",
    "Chicken n Cheese Pasta",
    "Chicken Penne Pasta",
    "Ground Turkey Pasta Bake",
    "Creamy Shrimp Pasta",
    "Lemon Butter Pasta",
    "Tagliatelle Pasta",
    "Baked Ravioli",
    "Fried Chicken (Small)",
    "Fried Chicken (Regular)",
    "Fried Chicken (Large)",
    "Hot Wings (Large)",
    "Devilled Chicken (Large)",
    "BBQ Chicken (Regular)",
    "Pepsi (330ml)",
    "Coca-Cola (330ml)",
    "Sprite (330ml)",
    "Mirinda (330ml)",
  ];
  let userInput = document.getElementById("search").value;

  if (userInput == "") {
    $(".menu-item").removeClass("hide");
  } else {
    $(".menu-item").addClass("hide");
  }

  document.getElementById("search-contaner").innerHTML = "";
  for (let i = 0; i < menuItemsArray.length; i++) {
    let regex = new RegExp(userInput, "ig");
    let string = menuItemsArray[i];
    let res = string.match(regex);

    if (res) {
      fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
          document.getElementById(
            "search-contaner"
          ).innerHTML += `<div class="card" style="width: 18rem;">
              <img class="card-img-top" height="170px" src="${data[i].img}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title my-1">${data[i].name}</h5>
                <p class="card-text my-0"><span class="span">Item code - </span>${data[i].code}</p>
                <p class="card-text my-0"><span class="span">Price -</span> ${data[i].price}</p>
                <a href="#" class="btn btn-primary my-1">Buy $</a>
                <a href="#" class="btn btn-primary">Add Cart</a>
              </div>
            </div>`;
        });
    }
  }
}

// Add to Cart

function addCart(title, img, itemCode, price, quantityId, unitPrice) {
  const name = document.getElementById(title).textContent;
  const imageSrc = document.getElementById(img).src;
  const code = document.getElementById(itemCode).textContent;
  const itemPrice = document.getElementById(price).textContent;

  let quantity = document.getElementById(quantityId).innerHTML;

  let total = itemPrice;
  totalPrice = 0;
  document.getElementById("total-price").innerHTML = `<h5>${totalPrice}</h5>`;


  let cartItems = `<div class="card" style="width: 18rem;">
  <img class="card-img-top" height="170px" src="${imageSrc}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title my-1">${name}</h5>
    <p class="card-text my-0"><span class="span">Item code - </span>${code}</p>
    <p class="card-text my-0"><span class="span">Price -</span> <span id="price${code}">${itemPrice} </span></p>
    <a href="#" class="btn btn-primary my-1">Buy $</a>
    <a class="btn btn-primary" onclick="removeCart(this)">Remove</a>
   <button class="btn btn-secondary my-1" onclick="qtyAdd('quantity${code}','${unitPrice}','price${code}')"disabled>+</button>
              <a id="quantity${code}" class="span">${quantity}</a>
              <button class="btn btn-secondary" onclick="qtyRemove('quantity${code}','${unitPrice}','price${code}')"disabled>-</button>
    <div class="form-check span card-text">
     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onchange="check(this,'${total}')">
    <label class="form-check-label" for="flexCheckDefault">
    Select item
   </label>
</div>
</div>
</div>`;

  for (let i = 0; i < cartItemsArray.length; i++) {
    if (cartItemsArray[i] == code) {
      Swal.fire({
        position: "top-bottom",
        icon: "warning",
        title: "Item already in cart",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  }

  document.getElementById("cart-contaner").innerHTML += cartItems;
  cartItemsArray.push(code);

  Swal.fire({
    position: "top-bottom",
    icon: "success",
    title: "Cart Added Successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Remove from cart

function removeCart(buttonElement) {
  buttonElement.parentElement.parentElement.remove();
  cartItemsArray.pop(buttonElement.parentElement.parentElement);
  Swal.fire({
    position: "top-bottom",
    icon: "success",
    title: "Item removed from cart",
    showConfirmButton: false,
    timer: 1500,
  });
}

let totalPrice = 0;
function check(checkElement, price) {
  if (checkElement.checked) {
    totalPrice += parseInt(price);
    document.getElementById("total-price").innerHTML = `<h5>${totalPrice}</h5>`;

  } else {
    totalPrice -= parseInt(price);
    document.getElementById("total-price").innerHTML = `<h5>${totalPrice}</h5>`;
  }

  if (totalPrice == 0) {
    $('.orders-price').removeClass('show');
  } else {
    $('.orders-price').addClass('show');
  }
}

// Quantity Add

function qtyAdd(quantityId, unitPrice, priceId) {
  let currentQuantity = parseInt(document.getElementById(quantityId).innerHTML);

  let newQuantity = currentQuantity + 1;
  document.getElementById(quantityId).innerHTML = newQuantity;

  let updatedPrice = parseFloat(unitPrice) * newQuantity;

  document.getElementById(priceId).innerHTML = updatedPrice.toFixed(2);
}

// Quantity Remove

function qtyRemove(quantityId, unitPrice, priceId) {
  let currentQuantity = parseInt(document.getElementById(quantityId).innerHTML);

  let newQuantity = currentQuantity - 1;

  if (currentQuantity > 1) {
    document.getElementById(quantityId).innerHTML = newQuantity;

    let updatedPrice = parseFloat(unitPrice) * newQuantity;

    document.getElementById(priceId).innerHTML = updatedPrice.toFixed(2);
  }
}
