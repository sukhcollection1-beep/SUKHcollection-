let cart = [];
const cartModal = document.getElementById('cart-modal');

// Add to Cart Function
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.parentElement;
        
        // SAFE IMAGE CAPTURE: Looks for an <img> tag inside the card
        const imgTag = card.querySelector('img');
        const imgSrc = imgTag ? imgTag.src : ''; 

        const item = {
            name: card.getAttribute('data-name'),
            price: parseInt(card.getAttribute('data-price')),
            image: imgSrc, // Now the image is saved!
            qty: 1
        };

        cart.push(item);
        updateCartUI();
        alert(item.name + " added to bag!");
    });
});

// Update Cart UI Function
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    // Clear the current display
    if (cartItemsContainer) cartItemsContainer.innerHTML = '';
    
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        // Create the HTML for each item including the image
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML += `
                <div class="cart-item" style="display:flex; align-items:center; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
                    <div style="display:flex; align-items:center;">
                        <img src="${item.image}" style="width:40px; height:40px; border-radius:4px; object-fit:cover; margin-right:10px;">
                        <div>
                            <p style="margin:0; font-weight:bold; font-size:14px;">${item.name}</p>
                            <p style="margin:0; font-size:12px; color:#555;">₹${item.price}</p>
                        </div>
                    </div>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">✕</button>
                </div>
            `;
        }
    });

    // Update Totals
    if (totalPriceElement) totalPriceElement.innerText = total;
    if (cartCountElement) cartCountElement.innerText = cart.length;
}

// Remove Item Function
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Function to open/close cart
function toggleCart() {
    if (cartModal) {
        cartModal.classList.toggle('active');
        // If your CSS doesn't use classes, use this fallback:
        // cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    }
}

// Function to close the rules box
function closeRules() {
    document.getElementById('rules-box').style.display = 'none';
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('final-price').innerText = total;
}

function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}
function toggleSearch() {
    const box = document.getElementById('searchBox');
    const input = document.getElementById('productSearch');
    
    box.classList.toggle('active');
    
    if (box.classList.contains('active')) {
        input.focus();
    } else {
        input.value = "";
        filterProducts(); // Resets your list when closed
    }
}

function filterProducts() {
    let input = document.getElementById('productSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.product-card'); // Ensure your cards have this class

    cards.forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        card.style.display = name.includes(input) ? "" : "none";
    });
}
function showReviewPopup() {
    const container = document.getElementById('review-items-container');
    const modal = document.getElementById('review-modal');
    
    container.innerHTML = ""; // Clear old view

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Your cart is empty!</p>";
    } else {
        cart.forEach((item) => {
            // This creates a mini-card for each item in the pop-up
            container.innerHTML += `
                <div style="display:flex; align-items:center; border-bottom:1px solid #eee; padding:10px 0;">
                    <img src="${item.image}" style="width:60px; height:60px; object-fit:cover; border-radius:5px; margin-right:15px;">
                    <div>
                        <p style="margin:0; font-weight:bold;">${item.name}</p>
                        <p style="margin:0; color:#666;">₹${item.price}</p>
                    </div>
                </div>
            `;
        });
    }
    
    modal.style.display = "block"; // Show the pop-up
}

function closeReviewPopup() {
    document.getElementById('review-modal').style.display = "none";
}



// WhatsApp Integration with Secret Keyword for Bot
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const total = document.getElementById('final-price').innerText;

    // Format the item list for the message
    let itemDetails = cart.map(item => `- ${item.name} (x${item.qty})`).join('%0A');

    // 1. SET YOUR NUMBER HERE (Include country code, no + sign)
    const businessNumber = "+919814056258"; 

    // 2. THE SECRET KEYWORD (This triggers your Android Bot)
    const secretKeyword = "OR2011";

    // 3. Create the Message
    // We put the secretKeyword first so the bot sees it immediately
    const message = `*${secretKeyword}*%0A%0A` +
                    `*Customer:* ${name}%0A` +
                    `*Address:* ${address}%0A` +
                    `*Contact:* ${phone}%0A%0A` +
                    `*Items Ordered:*%0A${itemDetails}%0A%0A` +
                    `*Total Amount:* ₹${total}`;

    // 4. Generate the Link
    const whatsappURL = `https://wa.me/${businessNumber}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank').focus();
});