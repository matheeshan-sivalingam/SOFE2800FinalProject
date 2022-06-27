//Sets the cart number as soon as the page is launched
setCartNum();
displayCart();

//Declaring carts array using getElementsByClassName
let carts = document.getElementsByClassName('btnAddCart');
//Declare product array 
let products = [
    {
        name: 'Nvidia RTX 3090',
        price: 1500,
        inCart: 0
    },
    {
        name: 'Nvidia RTX 3080',
        price: 700,
        inCart: 0
    },
    {
        name: 'Nvidia RTX 3070',
        price: 500,
        inCart: 0
    },
    {
        name: 'Nvidia RTX 2080 TI',
        price: 450,
        inCart: 0
    },
    {
        name: 'Nvidia RTX 2070 Super',
        price: 375,
        inCart: 0
    },
    {
        name: 'Nvidia RTX 2060',
        price: 330,
        inCart: 0
    },

]

//For loop to set each button to the appropriate functions 
for (let i = 0; i < carts.length;i++)
{
    carts[i].onclick = function()
    {
        swal("Item added!", "You have added an item to the cart!", "success");
        cartNum(products[i]);
        setItems(products[i]);
        subtotalCost(products[i]);
    };
};

//This functions sets the cart number in the top right of the screen when the screen first loads
function setCartNum() {
    let productNum = localStorage.getItem("cartNum");
    document.getElementById("productNum").innerHTML= productNum;
}

//This functions updates the cart number whenever the uesr pushes the add to cart button
function cartNum(product) 
{ 
    let productNum = parseInt(localStorage.getItem("cartNum"));
    if(productNum>=1 ){
        localStorage.setItem("cartNum", productNum+=1);
        document.getElementById("productNum").innerHTML= productNum;
    } else {
        localStorage.setItem("cartNum", 1);
        document.getElementById("productNum").innerHTML= 1;
    }
    
}

//This functions checks to see if the item is in local storage. If it is in local storage, it will add 1 to the incart value of the product. If it is not in local storage,
function setItems(product)
{
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (cartItems == null)
    {
        product.inCart = 1;
        cartItems = {
            [product.name] : product
    }   
    } else {
        if(cartItems[product.name] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        {
            cartItems[product.name].inCart +=1;
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//This functions checks to see if the subTotalCost is in the local storage. If it is in local storage, add subtotal cost to existing amount. If it is not, set the key
//and value of subtotal in local storage
function subtotalCost (product)
{
    let itemCost = localStorage.getItem("subTotal");
    if (itemCost==null)
    {
        localStorage.setItem("subTotal", product.price);
        
    }
    else 
    {
        localStorage.setItem("subTotal", parseInt(itemCost) + parseInt(product.price))
    }
}

//This function displays the information in the cart. 
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let productContainer = document.getElementById("productOutput");
    checkCart()
    if (cartItems && productContainer != null) {
        productContainer.innerHTML = " ";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML+= 
            `
            <div class = "row">
                <div class = "col deletebtn">
                    <ion-icon name="trash-outline" onclick = "deleteItem()"></ion-icon>
                </div>
                <div class = "col quantity">
                    <ion-icon name="remove-circle-outline" onclick = "decrement()"></ion-icon>${item.inCart}<ion-icon name="add-circle-outline" onclick = "increment()"></ion-icon>
                </div>
                    <div class = "col">$${item.price}
                </div>
                <div class = "col product">
                    ${item.name}
                </div>
                <div class = "col">
                    $${item.price * item.inCart}
                </div>
            </div>
             `;
        }
    )
    let subTotal = parseFloat(localStorage.getItem("subTotal"));
    calculateTotal(subTotal);
    }
}

//This function deletes an item (clears a row) when called from the table
function deleteItem(){
    let productNames = document.getElementsByClassName("product");
    let deleteBtns = document.getElementsByClassName("deletebtn");

    let productNum = localStorage.getItem("cartNum")
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let subTotal = parseFloat(localStorage.getItem("subTotal"));

    for (let i = 0;i<productNames.length;i++)
    {
        deleteBtns[i].onclick = function() {
            let item = productNames[i].textContent.trim();
            productNum = parseInt(productNum) - parseInt(cartItems[item].inCart);
            localStorage.setItem("cartNum",productNum);
            let subtractTotal = parseInt(cartItems[item].inCart) * parseFloat(cartItems[item].price);
            subTotal = subTotal - subtractTotal;
            calculateTotal(subTotal);
            console.log(cartItems[item])
            delete cartItems[item];
            localStorage.setItem("productsInCart",JSON.stringify(cartItems));
            displayCart();
            setCartNum()
        } 
        
    }
    
        
}

//This function decreases the inCart value of an item by 1. 
function decrement() {
    let productNames = document.getElementsByClassName("product");
    let quantity = document.getElementsByClassName("quantity");
    let productNum = localStorage.getItem("cartNum")
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let subTotal = parseFloat(localStorage.getItem("subTotal"));

    for (let i = 0;i<productNames.length;i++)
    {
        quantity[i].onclick = function() {
            let item = productNames[i].textContent.trim(); 
            let numOfItem = parseInt(cartItems[item].inCart)-1;
            productNum = parseInt(productNum) - 1;
            let subtractTotal = parseFloat(cartItems[item].price);
            console.log(subtractTotal);
            console.log(subTotal);
            subTotal = subTotal-subtractTotal;
            calculateTotal(subTotal);
            if (numOfItem == 0)
            {
                delete cartItems[item];
            }
            else {
                cartItems[item].inCart = numOfItem;
            }
            

            localStorage.setItem("productsInCart", JSON.stringify(cartItems))

             localStorage.setItem("cartNum",productNum);

            displayCart();

            setCartNum();
            
            
        }
    }
}

//This function increses the inCart value of an item by 1. 
function increment() {
    let productNames = document.getElementsByClassName("product");
    let quantity = document.getElementsByClassName("quantity");
    let productNum = localStorage.getItem("cartNum")
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let subTotal = parseFloat(localStorage.getItem("subTotal"));

    for (let i = 0;i<productNames.length;i++)
    {
        quantity[i].onclick = function() {
            let item = productNames[i].textContent.trim(); 
            let numOfItem = parseInt(cartItems[item].inCart)+1;

            productNum = parseInt(productNum) +1;

            let addTotal = parseFloat(cartItems[item].price);
            console.log(addTotal);
            console.log(subTotal);
            subTotal = subTotal+addTotal;
            calculateTotal(subTotal);
            cartItems[item].inCart = numOfItem;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            localStorage.setItem("cartNum",productNum);
            displayCart();
            setCartNum();
            
            
        }
    }
}
//This function calculates the total and tax
function calculateTotal(subTotal) {
        tax = subTotal*0.13;
        total = subTotal+tax;
        localStorage.setItem("Total", total);
        localStorage.setItem("subTotal",subTotal);
        document.getElementById("tax").innerHTML = "&nbsp $"+tax.toFixed(2);
        document.getElementById("subTotal").innerHTML = "$"+subTotal.toFixed(2);
        document.getElementById("total").innerHTML = "$"+total.toFixed(2);
}

//This function copys the value of the shipping address and pastes it to the value of the billing address
function copyBA()
{
    if (document.getElementById("showhideBA").checked)
    {
        document.getElementById("BAfname").value = document.getElementById("SAfname").value;
        document.getElementById("BAlname").value = document.getElementById("SAlname").value;
        document.getElementById("BAaddress").value = document.getElementById("SAaddress").value;
        document.getElementById("BAcity").value = document.getElementById("SAcity").value;
        document.getElementById("BAprov").value = document.getElementById("SAprov").value;
        document.getElementById("BApost").value = document.getElementById("SApost").value;
    }
    else 
    {
        document.getElementById("BAfname").value = "";
        document.getElementById("BAlname").value = "";
        document.getElementById("BAaddress").value = "";
        document.getElementById("BAcity").value = "";
        document.getElementById("BAprov").value = "";
        document.getElementById("BApost").value = "";
    }
    
}

//This function sends the cart and total info to a hidden textbox. It also directs the user to the checkOutForm
function setCartInfo()
{

    textboxes = document.getElementsByClassName("form-control")
        let cartItems = localStorage.getItem("productsInCart");  
            let total = localStorage.getItem("Total");
            document.getElementById("data").value = cartItems;
            document.getElementById("cost").value = total;
            localStorage.clear();
            location.href="checkOutForm.html";
    }
   
//This function will check to see if there is anything in cart. If there isn't, disable the next button 
function checkCart() 
{
    const btnNext = document.getElementById("btnNext")
    if (btnNext != null)
        {
        if (localStorage.getItem("cartNum")==0 ||localStorage.getItem("cartNum")==null)
            {
                btnNext.disabled = true;
            }
        else 
        {
            btnNext.disabled = false;
        }
    }
}