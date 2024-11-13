let products = JSON.parse(localStorage.getItem('products')) || [];
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

// Function to update the product list on the admin page
function displayProducts() {
    const productListAdmin = document.getElementById('productListAdmin');
    productListAdmin.innerHTML = ''; // Clear existing list
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" width="100">
            <p>SKU: ${product.sku}</p>
            <p>Code: ${product.code}</p>
            <p>₱${product.price}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productListAdmin.appendChild(productItem);
    });
}

// Function to add or edit a product
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const sku = document.getElementById('productSku').value;
    const code = document.getElementById('productCode').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const imageFile = document.getElementById('productImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = e.target.result;

            if (id) {
                // Edit existing product
                const product = products.find(p => p.id === parseInt(id));
                product.name = name;
                product.sku = sku;
                product.code = code;
                product.price = price;
                product.image = image;
            } else {
                // Add new product
                const newProduct = {
                    id: Date.now(),
                    name: name,
                    sku: sku,
                    code: code,
                    price: price,
                    image: image
                };
                products.push(newProduct);
            }

            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
            resetForm();
        };
        reader.readAsDataURL(imageFile);
    } else {
        // If no image is uploaded, retain the existing image or set a default image
        if (id) {
            const product = products.find(p => p.id === parseInt(id));
            product.name = name;
            product.sku = sku;
            product.code = code;
            product.price = price;
        } else {
            const newProduct = {
                id: Date.now(),
                name: name,
                sku: sku,
                code: code,
                price: price,
                image: 'default-image-url' // Set a default image or leave it empty
            };
            products.push(newProduct);
        }

        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        resetForm();
    }
});

// Function to edit a product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productSku').value = product.sku;
    document.getElementById('productCode').value = product.code;
    document.getElementById('productPrice').value = product.price;
}

// Function to delete a product
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Function to reset the form
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
}

// Initial load of products
displayProducts();
