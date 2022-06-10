let cart = document.querySelectorAll('.add-cart');

for(let i=0; i<cart.length; i++){
    cart[i].addEventListener('click', ()=>{
        cartNumber();
    })
}

function onLoadCartNumbers(){
    let productNumber = localStorage.getItem('cartNumber');
     
    if(productNumber){
        document.querySelector('.cart-btn span').textContent = productNumber;
    }
}

function cartNumber(){

    let productNumber = localStorage.getItem('cartNumber');

    productNumber = parseInt(productNumber);

    if(productNumber){
        localStorage.setItem('cartNumber', productNumber + 1);
        document.querySelector('.cart-btn span').textContent = productNumber + 1;
    } else{
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.cart-btn span').textContent = 1;
    }
   
}

onLoadCartNumbers();