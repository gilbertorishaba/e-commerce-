document.addEventListener("DOMContentLoaded", function() {
    const productGrid = document.getElementById("product-grid");
    const searchBox = document.getElementById("search-box");
    const searchBtn = document.getElementById("search-btn");
    const modal = document.getElementById("product-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const closeModal = document.getElementById("close-modal");

    const totalCards = 100;
    const imageCount = 26; // Number of images available (hik2 to hik27)
    const imagePath = "prod/";
    let cart = [];
    
    // Array of CCTV camera names
    const cameraNames = [
        "Hikvision DS-2CD2087G2-L", "Dahua N52A", "AXIS M2026-LE", "Lorex LNB8005",
        "Arlo Ultra 4K", "Nest Cam Outdoor", "Ring Floodlight Cam", "Swann SWPRO-4K",
        "Amcrest ProHD", "Reolink RLC-511", "Samsung Wisenet PNF-9010", "TP-Link Tapo C310",
        "Vivotek IB8377-E", "Bosch DINION IP starlight 7000 HD", "Uniview IPC3235ER3-DVZ",
        "Hikvision DS-2CD2385FWD-I", "Dahua IPC-HDW4631C-A", "AXIS Q6075-E", "Lorex LNB8005B",
        "Arlo Pro 4", "Nest Cam Indoor", "Ring Indoor Cam", "Swann SWNHD-888MSB", "Amcrest UltraHD 4K",
        "Reolink RLC-410", "Samsung SmartCam HD", "TP-Link Tapo C200", "Vivotek FD9360-HV",
        "Bosch FLEXIDOME IP 5000", "Uniview IPC3634SR3-DPZ", "Hikvision DS-2CD2347G1-L",
        "Dahua IPC-HDW3441C", "AXIS P1427-LE", "Lorex LNB4422", "Arlo Q Plus",
        "Nest Cam IQ Outdoor", "Ring Stick Up Cam", "Swann NHD-865MSB", "Amcrest IP8M-T2499EW",
        "Reolink RLC-423", "Samsung Wisenet TNO-6030", "TP-Link Tapo C400", "Vivotek IB9360-HT",
        "Bosch AUTODOME IP 5000", "Uniview IPC3614ER3-DPZ", "Hikvision DS-2CD2585FWD-I",
        "Dahua IPC-HDW4831EM-ASE", "AXIS Q1798-LE", "Lorex LNB8105", "Arlo Essential Spotlight",
        "Nest Cam IQ Indoor", "Ring Video Doorbell Pro 2", "Swann SWWHD-865MSB", "Amcrest IP5M-T1179EW",
        "Reolink RLC-520", "Samsung SmartCam HD Plus", "TP-Link Tapo C500", "Vivotek IB8371-E",
        "Bosch FLEXIDOME IP 7000", "Uniview IPC3235LR3-DVZ", "Hikvision DS-2CD2745FWD-IZS",
        "Dahua IPC-HDW4831H-AS", "AXIS Q6215-LE", "Lorex LNB9974B", "Arlo Pro 2",
        "Nest Cam Outdoor IQ", "Ring Stick Up Cam Elite", "Swann SWNHD-869MSB", "Amcrest IP8M-2496EB",
        "Reolink RLC-810A", "Samsung Wisenet PNM-9320VQP", "TP-Link Tapo C110", "Vivotek IB8350-H",
        "Bosch DINION IP 5000", "Uniview IPC3238SR3-D", "Hikvision DS-2CD2086G2-I",
        "Dahua IPC-HDW4231EM-ASE", "AXIS P3717-PLE", "Lorex LNB8552", "Arlo Pro 3 Floodlight",
        "Nest Cam Indoor IQ", "Ring Video Doorbell 3", "Swann SWNHD-880MSB", "Amcrest IP8M-2496EB",
        "Reolink RLC-423", "Samsung SmartCam HD Pro", "TP-Link Tapo C320", "Vivotek FD9365-HV",
        "Bosch FLEXIDOME IP 7000i", "Uniview IPC3635ER3-DPZ", "Hikvision DS-2CD2123G0-I",
        "Dahua IPC-HDW5631EM-ASE", "AXIS Q6128-E", "Lorex LNB9174", "Arlo Essential Spotlight Cam",
        "Nest Cam Indoor IQ", "Ring Video Doorbell Pro", "Swann SWNHD-881MSB", "Amcrest IP8M-2596EW",
        "Reolink RLC-511W"
    ];



    // Function to create a product card
    function createProductCard(index) {
        const card = document.createElement("div");
        card.className = "product-card";

        // Determine the image number (cycle through available images)
        const imageNumber = (index % imageCount) + 2; // Start from hik2 to hik27
        const imageName = `hik${imageNumber}.jpg`;
        const productTitle = cameraNames[index % cameraNames.length]; // Get camera name from array
        const productPrice = `$${(Math.random() * 100 + 10).toFixed(2)}`;

        card.innerHTML = `
            <img src="${imagePath}${imageName}" alt="Product Image">
            <h3>${productTitle}</h3>
            <p>${productPrice}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Add data attributes for easy access later
        card.setAttribute("data-title", productTitle);
        card.setAttribute("data-price", productPrice);
        card.setAttribute("data-image", `${imagePath}${imageName}`);
        card.setAttribute("data-index", index); // Unique identifier for each card

        return card;
    }

    // Generate all product cards
    for (let i = 0; i < totalCards; i++) {
        const card = createProductCard(i);
        productGrid.appendChild(card);
    }

    // Function to filter and display products based on search query
    function filterProducts(query) {
        const cards = document.querySelectorAll(".product-card");
        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query.toLowerCase())) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Event listener for the search button
    searchBtn.addEventListener("click", function() {
        const query = searchBox.value;
        filterProducts(query);
    });

    // Optional: Add real-time search functionality
    searchBox.addEventListener("input", function() {
        const query = searchBox.value;
        filterProducts(query);
    });

    // Event listener for adding products to the cart
    productGrid.addEventListener("click", function(e) {
        if (e.target.classList.contains("add-to-cart")) {
            const card = e.target.closest(".product-card");
            const productTitle = card.getAttribute("data-title");
            const productPrice = card.getAttribute("data-price");
            const productImage = card.getAttribute("data-image");

            addToCart(productTitle, productPrice, productImage);
        }
    });

    // Function to add product to cart
    function addToCart(title, price, image) {
        const product = { title, price, image };
        cart.push(product);
        updateCartDisplay();
        alert(`${title} has been added to the cart.`);
    }

    // Function to update the cart display
    function updateCartDisplay() {
        const cartLink = document.querySelector(".cart");
        cartLink.textContent = `Cart (${cart.length})`;
    }

    // Modal functionality
    productGrid.addEventListener("click", function(e) {
        if (e.target.closest(".product-card")) {
            const card = e.target.closest(".product-card");
            const img = card.querySelector("img").src;
            const title = card.querySelector("h3").textContent;
            const price = card.querySelector("p").textContent;

            modalImg.src = img;
            modalTitle.textContent = title;
            modalPrice.textContent = price;

            modal.style.display = "block";
        }
    });

    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
