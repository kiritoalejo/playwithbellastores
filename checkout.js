// Retrieve checkout items from localStorage
const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

// Display checkout items
function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    checkoutItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    checkoutCart.forEach(item => {
        const checkoutItem = document.createElement('li');
        checkoutItem.innerHTML = `${item.name} - P${item.price}`;
        checkoutItemsContainer.appendChild(checkoutItem);
        totalPrice += item.price;
    });

    document.getElementById('checkoutTotalPrice').innerText = `Total Price: P${totalPrice}`;
}

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Display order summary (or send to server)
    alert(`Order placed successfully!\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nTotal: ${document.getElementById('checkoutTotalPrice').innerText}`);

    // Clear cart after order is placed
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutCart');
    window.location.href = 'index.html'; // Redirect to homepage
});

displayCheckoutItems();
// Save order to localStorage for admin viewing
function saveOrder(name, address, phone, items, totalPrice) {
    let orders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    const newOrder = {
        name: name,
        address: address,
        phone: phone,
        items: items,
        totalPrice: totalPrice,
        status: 'Pending' // default status
    };
    orders.push(newOrder);
    localStorage.setItem('customerOrders', JSON.stringify(orders));
}

// Modify the form submission handler in `checkout.js` to save the order
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Prepare order data
    const items = checkoutCart.map(item => ({ name: item.name, price: item.price }));
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    // Save order for admin viewing
    saveOrder(name, address, phone, items, totalPrice);

    // Clear cart after order is placed
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutCart');

    alert('Order placed successfully!');
    window.location.href = 'index.html'; // Redirect to homepage
});
