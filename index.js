//remove button
let remove_button=document.getElementsByClassName('btn-danger')
for(let i=0;i<remove_button.length;i++){
    remove_button[i].addEventListener('click',removeItem)
}

function removeItem(event){
    let remove_button=event.target
    remove_button.parentElement.parentElement.remove()
    updateTotal()
}

//change the quantity
let quantity=document.getElementsByClassName('cart-quantity-input')
for(let i=0;i<quantity.length;i++){
    quantity[i].addEventListener('change',changeQuantity)
}

function changeQuantity(event){
    let quantity=event.target
    if(isNaN(quantity.value) || quantity.value<1){
        quantity.value=1
    }
    updateTotal()
}

//Add to cart
var addToCartButtons=document.getElementsByClassName('shop-item-button')
for (let index = 0; index < addToCartButtons.length; index++) {
    var button=addToCartButtons[index]
    button.addEventListener('click',addToCartClicked)
    
}
function addToCartClicked(event){
    var button=event.target
    var shopItem=button.parentElement.parentElement
    var title=shopItem.getElementsByClassName('card-title')[0].innerText
    var price=shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc=shopItem.getElementsByClassName('img-fluid')[0].src
    console.log(title,price,imageSrc)
    addItemToCart(title,price,imageSrc)
    updateTotal()

}
function addItemToCart(title,price,imageSrc){

    var cartRow=document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
    for (let index = 0; index < cartItemNames.length; index++) {
        if(cartItemNames[index].innerText==title){
            alert("This item is already added to the cart")
            return
        }
        
    }
    var cartRowContent=`
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML=cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQuantity)


}

//Update Total cart
function updateTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total=0
    for (var i = 0; i < cartRows.length; i++) {
        var priceElement = cartRows[i].getElementsByClassName('cart-price')[0]
        var quantityElement = cartRows[i].getElementsByClassName('cart-quantity-input')[0]
        var price=parseFloat(priceElement.innerText.replace('$',''))
        var quantity=quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total   
}



//purshase
let purchase=document.getElementsByClassName('purchase')[0].addEventListener('click',purchaseClicked)

function purchaseClicked(){
    alert("thank you for your purchase")
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotalCart()
}


      
        

   
    
