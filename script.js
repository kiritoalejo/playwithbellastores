// Fetch products from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];
// Fetch and display products on page load
window.addEventListener('load', displayProducts);

const firebaseConfig = {
    apiKey: "AIzaSyDb1SN7W_Ldtq9bf-QupXBHSk6YF5LLpbg",
    authDomain: "playwithbella-7a509.firebaseapp.com",
    projectId: "playwithbella-7a509",
    storageBucket: "playwithbella-7a509.firebasestorage.app",
    messagingSenderId: "301614892011",
    appId: "1:301614892011:web:149d9011389a06bfa80fae",
    measurementId: "G-6N757LWQEP"
  };
  // Function to save a product to Firestore
function saveProduct(product) {
    db.collection("products").add(product)
        .then(() => {
            console.log("Product added successfully!");
            displayProducts(); // Call displayProducts after adding a new product
        })
        .catch((error) => {
            console.error("Error adding product: ", error);
        });
}

// Function to display products from Firestore
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear current products

    db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>SKU: ${product.sku}</p>
                <p>Code: ${product.code}</p>
                <p>P${product.price}</p>
                <button onclick="addToCart('${doc.id}')">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    });
}


// Function to add a product to the cart


// Function to show the cart modal
function showCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - P${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    document.getElementById('cartModal').style.display = 'block'; // Show the modal
}

// Function to close the cart modal
document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none'; // Hide the modal
});

// Function to handle checkout (you can implement a custom action here)
document.getElementById('checkoutButton').addEventListener('click', function() {
    alert('Proceeding to checkout...');
    // Here you can implement checkout functionality, e.g., redirect to a checkout page
});

// Remove product from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart button count
    document.getElementById('cartButton').innerText = `🛒 View Cart (${cart.length})`;

    // Refresh the cart modal view
    showCart();
}

// Initial display of products
displayProducts();

// Update the cart button text
const cart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cartButton').innerText = `🛒 View Cart (${cart.length})`;

// Event listener for cart button
document.getElementById('cartButton').addEventListener('click', showCart);

// Call displayProducts when the page loads
window.addEventListener('load', displayProducts);
