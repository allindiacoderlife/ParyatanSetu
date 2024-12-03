document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('hotelBookingForm');
    const roomTypeSelect = document.getElementById('roomType');
    const promoCodeInput = document.getElementById('promoCode');
    const basePriceSpan = document.getElementById('basePrice');
    const discountSpan = document.getElementById('discount');
    const totalPriceSpan = document.getElementById('totalPrice');

    // Room prices
    const roomPrices = {
        'standard': 2000,
        'deluxe': 3500,
        'suite': 5000
    };

    // Promo codes
    const promoCodes = {
        'GOVT20': 0.20,
        'SUMMER25': 0.25,
        'SPECIAL30': 0.30
    };

    let bookings = [];

    function calculatePrice() {
        const selectedRoom = roomTypeSelect.value;
        const promoCode = promoCodeInput.value.toUpperCase();
        
        if (!selectedRoom) return;

        const basePrice = roomPrices[selectedRoom];
        let discount = 0;

        if (promoCode in promoCodes) {
            discount = basePrice * promoCodes[promoCode];
        }

        const totalPrice = basePrice - discount;

        basePriceSpan.textContent = `₹${basePrice}`;
        discountSpan.textContent = `₹${discount}`;
        totalPriceSpan.textContent = `₹${totalPrice}`;
    }

    roomTypeSelect.addEventListener('change', calculatePrice);
    promoCodeInput.addEventListener('input', calculatePrice);

    function showConfirmationModal(bookingDetails) {
        const modal = document.getElementById('confirmationModal');
        const summary = modal.querySelector('.booking-summary');
        
        summary.innerHTML = `
            <p><strong>Room Type:</strong> ${bookingDetails.roomType}</p>
            <p><strong>Check-in:</strong> ${bookingDetails.checkIn}</p>
            <p><strong>Check-out:</strong> ${bookingDetails.checkOut}</p>
            <p><strong>Guests:</strong> ${bookingDetails.guests}</p>
            <p><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</p>
        `;
        
        modal.style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('confirmationModal').style.display = 'none';
    }

    function closeSuccessModal() {
        document.getElementById('successModal').style.display = 'none';
    }

    function showSuccessModal() {
        document.getElementById('successModal').style.display = 'flex';
    }

    function confirmBooking() {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        document.querySelector('.modal-content').appendChild(loadingSpinner);
        
        // Simulate API call
        setTimeout(() => {
            closeModal();
            showSuccessModal();
            updateBookingsList();
        }, 2000);
    }

    function updateBookingsList() {
        const bookingsList = document.querySelector('.bookings-list');
        const newBooking = {
            id: Date.now(),
            roomType: document.getElementById('roomType').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            status: 'confirmed'
        };
        
        bookings.push(newBooking);
        
        renderBookings();
    }

    function renderBookings() {
        const bookingsList = document.querySelector('.bookings-list');
        bookingsList.innerHTML = bookings.map(booking => `
            <div class="booking-card" data-id="${booking.id}">
                <h4>${booking.roomType}</h4>
                <p>Check-in: ${booking.checkIn}</p>
                <p>Check-out: ${booking.checkOut}</p>
                <span class="status-badge status-${booking.status}">${booking.status}</span>
                ${booking.status === 'confirmed' ? 
                    `<button onclick="cancelBooking(${booking.id})" class="cancel-btn">Cancel Booking</button>` : 
                    ''}
            </div>
        `).join('');
    }

    function cancelBooking(bookingId) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const booking = bookings.find(b => b.id === bookingId);
            if (booking) {
                booking.status = 'cancelled';
                renderBookings();
            }
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        
        if (new Date(checkIn) >= new Date(checkOut)) {
            alert('Check-out date must be after check-in date');
            return;
        }

        const bookingDetails = {
            roomType: roomTypeSelect.value,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: document.getElementById('guests').value,
            totalPrice: totalPriceSpan.textContent
        };

        showConfirmationModal(bookingDetails);
    });

    // Add date validation
    document.getElementById('checkIn').addEventListener('change', function() {
        const checkIn = new Date(this.value);
        const minDate = new Date(checkIn);
        minDate.setDate(minDate.getDate() + 1);
        
        document.getElementById('checkOut').min = minDate.toISOString().split('T')[0];
    });

    // Set minimum check-in date to today
    const today = new Date();
    document.getElementById('checkIn').min = today.toISOString().split('T')[0];
}); 