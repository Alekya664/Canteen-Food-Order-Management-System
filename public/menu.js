document.addEventListener('DOMContentLoaded', function() {
    const menuItemsData = [
        { id: 1, name: 'Burger', price: 10 },
        { id: 2, name: 'Pizza', price: 12 },
        { id: 3, name: 'Salad', price: 8 }
    ];

    const menuItemsList = document.getElementById('menu-items');
    const cartItemsList = document.getElementById('cart-items');
    const totalButton = document.getElementById('total-btn');
    const checkoutButton = document.getElementById('checkout-btn');
    const orderIdDisplay = document.getElementById('order-id');

    let orderIdCounter = 1; // Unique order ID counter

    function displayMenuItems() {
        menuItemsList.innerHTML = '';
        menuItemsData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
            `;
            menuItemsList.appendChild(li);
        });
    }

    // Function to fetch order status
async function getOrderStatus(orderId) {
    try {
        const response = await fetch(`/get_order_status/${orderId}`);
        if (response.ok) {
            const data = await response.json();
            return data.status;
        } else {
            throw new Error('Failed to fetch order status');
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to display notifications
function displayNotification(orderId, status) {
    // Display notification to the user based on orderId and status
    console.log(`Order ${orderId} status: ${status}`);
}

// Poll for updates every 5 seconds (adjust as needed)
setInterval(async () => {
    const orderId = ''; // Set the orderId you want to track
    const status = await getOrderStatus(orderId);
    if (status) {
        displayNotification(orderId, status);
    }
}, 5000); // 5000 milliseconds = 5 seconds


    function updateOrderStatus(orderId, newStatus) {
        // Assuming you have a fetch function available
        fetch(`/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            let orderStatus = document.getElementById('order-status');
            orderStatus.innerHTML = `Order Status: ${data.status}`;
          } else {
            console.error(data.error);
          }
        })
        .catch(error => console.error('Error:', error));
      }
      

    function generateOrderId() {
        const timestamp = new Date().getTime(); // Current timestamp
        const random = Math.floor(Math.random() * 10000); // Random number
        return `${timestamp}${random}`;
    }

    function calculateTotal() {
        let totalAmount = 0;
        const cartItems = cartItemsList.querySelectorAll('li');
        cartItems.forEach(item => {
            const priceMatch = item.textContent.match(/\$(\d+)/);
            if (priceMatch) {
                const price = parseFloat(priceMatch[1]);
                totalAmount += price;
            } else {
                console.log('Price not found for item:', item.textContent);
            }
        });
        totalButton.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    }

    function addToCart(itemId) {
        const selectedItem = menuItemsData.find(item => item.id === itemId);
        const li = document.createElement('li');
        li.textContent = `${selectedItem.name} - $${selectedItem.price}`;
        cartItemsList.appendChild(li);
    }

    checkoutButton.addEventListener('click', function() {
        // Generate order ID
        const orderId = generateOrderId();

        // Display order ID
        orderIdDisplay.textContent = `Order ID: ${orderId}`;

        // Calculate total amount
        calculateTotal();
    });

    menuItemsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            addToCart(itemId);
        }
    });

    totalButton.addEventListener('click', function() {
        calculateTotal();
    });

    displayMenuItems();
});
