// Function to create a product card
function createProductCard(id, title, price) {
    // Using hik1.webp for demonstration, change as needed
    const imageSrc = id === 1 ? 'images/hik1.webp' : `images/product${id}.jpg`;

    return `
        <div class="product-card" data-id="${id}" data-title="${title}" data-price="${price}">
            <img src="${imageSrc}" alt="${title}">
            <h3>${title}</h3>
            <p>$${price}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;
}

// Generate 100 products dynamically
const productGrid = document.getElementById('product-grid');
for (let i = 1; i <= 100; i++) {
    const productCardHTML = createProductCard(i, `Product ${i}`, (Math.random() * 100).toFixed(2));
    productGrid.innerHTML += productCardHTML;
}

// Basic Cart Implementation
let cart = [];

function addToCart(productName, price) {
    const product = { name: productName, price: price };
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartLink = document.querySelector('.cart');
    cartLink.textContent = `Cart (${cart.length})`;
}

// Event Listener for Add to Cart Buttons
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', event => {
        const productCard = event.target.closest('.product-card');
        const productId = productCard.getAttribute('data-id');
        const productName = productCard.getAttribute('data-title');
        const price = productCard.getAttribute('data-price');

        // Open modal with product details
        openProductModal(productId, productName, price);
    });
});

// Modal Functionality
function openProductModal(id, title, price) {
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');

    // Using hik1.webp for demonstration, change as needed
    modalImg.src = id === '1' ? 'images/hik1.webp' : `images/product${id}.jpg`;
    modalTitle.textContent = title;
    modalPrice.textContent = `$${price}`;
    modal.style.display = 'block';
}

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('product-modal').style.display = 'none';
});

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
