// Fetch cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Function to add a product to Firestore
function saveProduct(product) {
    db.collection("products").add(product)
    .then(() => {
        console.log("Product added successfully!");
        displayProducts(); // Update product list after saving
    })
    .catch((error) => {
        console.error("Error adding product: ", error);
    });
}

// Display cart items
function displayCartItems() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100px; height:auto;">
            <h3>${item.name}</h3>
            <p>Price: P${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);
        totalPrice += item.price;
    });

    document.getElementById('totalPrice').innerText = `Total Price: P${totalPrice}`;
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Proceed to checkout
document.getElementById('checkoutButton').addEventListener('click', function() {
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});

displayCartItems();
