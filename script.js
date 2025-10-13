document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const generalQtyInput = document.getElementById('general-qty');
    const vipQtyInput = document.getElementById('vip-qty');
    const backstageQtyInput = document.getElementById('backstage-qty');
    
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    
    const subtotalAmountSpan = document.getElementById('subtotal-amount');
    const serviceFeeSpan = document.getElementById('service-fee');
    const totalAmountSpan = document.getElementById('total-amount');
    const purchaseBtn = document.getElementById('purchase-btn');
    
    // Ticket prices
    const ticketPrices = {
        'general': 49.99,
        'vip': 149.99,
        'backstage': 299.99
    };
    
    // Calculate total function
    function calculateTotal() {
        // Get quantities
        const generalQty = parseInt(generalQtyInput.value) || 0;
        const vipQty = parseInt(vipQtyInput.value) || 0;
        const backstageQty = parseInt(backstageQtyInput.value) || 0;
        
        // Calculate subtotal
        const generalTotal = generalQty * ticketPrices.general;
        const vipTotal = vipQty * ticketPrices.vip;
        const backstageTotal = backstageQty * ticketPrices.backstage;
        const subtotal = generalTotal + vipTotal + backstageTotal;
        
        // Calculate service fee (10% of subtotal)
        const serviceFee = subtotal * 0.1;
        const total = subtotal + serviceFee;
        
        // Update display
        subtotalAmountSpan.textContent = '$' + subtotal.toFixed(2);
        serviceFeeSpan.textContent = '$' + serviceFee.toFixed(2);
        totalAmountSpan.textContent = '$' + total.toFixed(2);
    }
    
    // Quantity button event listeners
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketType = this.getAttribute('data-ticket');
            const input = document.getElementById(ticketType + '-qty');
            let value = parseInt(input.value) || 0;
            
            if (value > 0) {
                value--;
                input.value = value;
                calculateTotal();
            }
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketType = this.getAttribute('data-ticket');
            const input = document.getElementById(ticketType + '-qty');
            let value = parseInt(input.value) || 0;
            
            if (value < 10) { // Max 10 tickets per type
                value++;
                input.value = value;
                calculateTotal();
            }
        });
    });
    
    // Input change event listeners
    generalQtyInput.addEventListener('input', calculateTotal);
    vipQtyInput.addEventListener('input', calculateTotal);
    backstageQtyInput.addEventListener('input', calculateTotal);
    
    // Purchase button functionality
    purchaseBtn.addEventListener('click', function() {
        const generalQty = parseInt(generalQtyInput.value) || 0;
        const vipQty = parseInt(vipQtyInput.value) || 0;
        const backstageQty = parseInt(backstageQtyInput.value) || 0;
        
        // Check if any tickets are selected
        if (generalQty + vipQty + backstageQty === 0) {
            alert('Please select at least one ticket.');
            return;
        }
        
        // Show confirmation
        const totalTickets = generalQty + vipQty + backstageQty;
        const totalCost = parseFloat(totalAmountSpan.textContent.replace('$', ''));
        
        const confirmation = confirm(`Purchase ${totalTickets} ticket(s) for $${totalCost.toFixed(2)}?\n\nProceed to checkout?`);
        
        if (confirmation) {
            alert(`Thank you for your purchase!\n\n${totalTickets} ticket(s) have been added to your cart.`);
            
            // In a real application, this would redirect to a checkout page
            // window.location.href = 'checkout.html';
        }
    });
    
    // Initialize total calculation
    calculateTotal();
});