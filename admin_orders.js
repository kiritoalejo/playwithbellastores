// Fetch customer orders from localStorage
let orders = JSON.parse(localStorage.getItem('customerOrders')) || [];
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

// Function to display orders on the page
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = ''; // Clear any existing orders

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p><strong>Customer Name:</strong> ${order.name}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Items Ordered:</strong></p>
            <ul>
                ${order.items.map(item => `<li>${item.name} - P${item.price}</li>`).join('')}
            </ul>
            <p><strong>Total Price:</strong> P${order.totalPrice}</p>
            <p><strong>Status:</strong> ${order.status || 'Pending'}</p>
            <button onclick="updateOrderStatus(${index}, 'Shipped')">Mark as Shipped</button>
            <button onclick="updateOrderStatus(${index}, 'Delivered')">Mark as Delivered</button>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Function to update order status
function updateOrderStatus(orderIndex, status) {
    orders[orderIndex].status = status;
    localStorage.setItem('customerOrders', JSON.stringify(orders));
    displayOrders();
}

// Initial display of orders
displayOrders();
