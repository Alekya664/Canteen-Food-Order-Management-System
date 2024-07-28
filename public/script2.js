document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('food-item-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form input values
        const name = document.getElementById('name').value.trim();
        const price = parseFloat(document.getElementById('price').value);

        // Validation: Ensure name and price are provided
        if (!name || !price || isNaN(price) || price <= 0) {
            alert('Please provide a valid name and price.');
            return;
        }

        // Validation successful: Create food item object
        const foodItem = {
            name: name,
            price: price
        };

        // Perform further processing, e.g., send data to server, update menu, etc.
        console.log('New Food Item:', foodItem);

        // Clear the form fields after submission
        form.reset();
    });
});
