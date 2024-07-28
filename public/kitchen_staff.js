document.addEventListener('DOMContentLoaded', function() {
    const updateStatusForm = document.getElementById('update-status-form');
    const orderStatusDiv = document.getElementById('order-status');

    updateStatusForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get input values
        const orderId = document.getElementById('order-id').value;
        const items = document.getElementById('items').value;
        const newStatus = document.getElementById('new-status').value;

        // Validation: Ensure orderId is provided
        if (!orderId) {
            alert('Please provide an order ID.');
            return;
        }

        // Update order status
        updateOrderStatus(orderId,items, newStatus);
    });

    function updateOrderStatus(orderId,items, newStatus) {
        // Simulated server request (replace with actual server request)
        // Here, we'll just update the order status in the UI
        const orderStatus = document.createElement('p');
        orderStatus.textContent = `Order ID: ${orderId} - List of items: ${items} - Status: ${newStatus}`;
        orderStatusDiv.appendChild(orderStatus);
        
    }
    
      

    // Example: Pre-fill order status for demonstration purposes
    updateOrderStatus(12345,'Burger', 'received');
});

