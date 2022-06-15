let cart = document.querySelectorAll('.add-cart');

let products = [ {
     name: 'Blue flower printed dress',
     tag: 'BlueDress',
     price: 790,
     inCart: 0
},
{
    name: 'white printed T-shirt',
    tag: 'whiteTee',
    price: 440,
    inCart: 0
},
{
    name: 'Blue straight fit jeans',
    tag: 'blueJeans',
    price: 999,
    inCart: 0
}
];

for(let i=0; i < cart.length; i++){
    cart[i].addEventListener('click', ()=>{
        cartNumber(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    
    
    let productNumber = localStorage.getItem('cartNumber');
     
    if(productNumber){
        document.querySelector('.cart-btn span').textContent = productNumber;
    }
}

function cartNumber(product){

    let productNumber = localStorage.getItem('cartNumber');

    productNumber = parseInt(productNumber);

    if(productNumber){
        localStorage.setItem('cartNumber', productNumber + 1);
        document.querySelector('.cart-btn span').textContent = productNumber + 1;
    } else{
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.cart-btn span').textContent = 1;
    }
    setItems(product);
   
}
function setItems(product){
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)
    console.log('My cartItems are', cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
             cartItems = {
                ...cartItems,
                [product.tag]: product
             }
        }

     cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
         cartItems = {
           [product.tag]: product
           }
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    console.log('My cartCost is', cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else{
        localStorage.setItem('totalCost', product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    console.log(productContainer);

    if(cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item =>{
        console.log(item)
      productContainer.innerHTML += `<div class="product">
      <img src="./images/${item.tag}.jpg">
      <ion-icon name="close-circle-outline"></ion-icon>
      <span>${item.name}</span>
      </div>
      <div class="price">${item.price}</div>
      <div class="quantity">
      <ion-icon name="remove-circle-outline"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="add-circle-outline"></ion-icon>
      </div>
      <div class="total">${item.inCart*item.price}</div>`
      });

      productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">Basket Total</h4>
      <h4 class="basketTotal">INR${cartCost}</h4>
      </div>
      `;
      
    }
}


onLoadCartNumbers();
displayCart();

window.addEventListener('DOMContentLoaded', () =>{
    axios.get('http://localhost:5500/index.html').then((data) => {
        console.log(data);
    })
})