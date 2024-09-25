fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

function displayProducts(products) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;

        const productPrice = document.createElement('p');
        productPrice.textContent = `₹${product.price}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('addToCartBtn');
        addToCartButton.textContent = 'Add to Cart';

        addToCartButton.addEventListener('click', () => {
            addToCart(product);
        });

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartButton);

        productsContainer.appendChild(productDiv);
    });
}

let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartItemsList = document.getElementById('cartitems');
    cartItemsList.innerHTML = ''; 

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        const cartImage = document.createElement('img');
        cartImage.src = item.image;
        cartImage.alt = item.title;
        cartImage.style.width = '80px';
        cartImage.style.height = 'auto';

        const cartDetails = document.createElement('div');
        cartDetails.classList.add('cart-details');

        const cartItemText = document.createElement('span');
        cartItemText.textContent = `${item.title} - ₹${item.price} (x${item.quantity})`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        const increaseButton = document.createElement('button');
        increaseButton.textContent = 'Increase';
        increaseButton.addEventListener('click', () => {
            increaseQuantity(item.id);
        });

        cartDetails.appendChild(cartItemText);
        cartDetails.appendChild(increaseButton);
        cartDetails.appendChild(removeButton);

        cartItem.appendChild(cartImage);
        cartItem.appendChild(cartDetails);

        cartItemsList.appendChild(cartItem);
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); 
    renderCart(); 
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1; 
        renderCart(); 
    }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        });
});