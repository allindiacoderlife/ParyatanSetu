document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const cabTypes = document.querySelectorAll('.cab-type');
    const estimatedFare = document.getElementById('estimatedFare');
    const confirmationModal = document.getElementById('confirmationModal');
    const successModal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close');
    const confirmBtn = document.getElementById('confirmBooking');
    const cancelBtn = document.getElementById('cancelBooking');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    
    let selectedCabType = null;

    const promoCodes = {
        'FIRST50': 50,
        'SAVE20': 20,
        'MONSOON30': 30
    };

    // City-based surge pricing
    const citySurge = {
        'mumbai': 1.2,
        'delhi': 1.1,
        'bangalore': 1.15,
        'chennai': 1.1,
        'kolkata': 1.1,
        'hyderabad': 1.1,
        'pune': 1.05,
        'ahmedabad': 1.05,
        'jaipur': 1.05,
        'lucknow': 1.05
    };

    let appliedDiscount = 0;

    // Track booking status
    let isBookingConfirmed = false;
    let trackingInterval;

    // Cab type selection
    cabTypes.forEach(cab => {
        cab.addEventListener('click', function() {
            cabTypes.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedCabType = {
                type: this.querySelector('h4').textContent,
                price: parseFloat(this.dataset.price)
            };
            updateFareEstimate();
        });
    });

    // Update fare calculation
    function updateFareEstimate() {
        if (selectedCabType) {
            const citySelect = document.getElementById('city');
            const surgeFactor = citySurge[citySelect.value] || 1;
            
            // Simulate distance calculation (in real app, use Maps API)
            const distance = Math.floor(Math.random() * 20) + 5; // 5-25 km
            const baseFare = 50; // Base fare in rupees
            const distanceCharge = distance * selectedCabType.price * surgeFactor;
            const subtotal = baseFare + distanceCharge;
            const gst = subtotal * 0.05; // 5% GST
            const discount = (subtotal + gst) * (appliedDiscount / 100);
            const total = subtotal + gst - discount;

            // Update fare breakdown
            document.getElementById('baseFare').textContent = `₹${baseFare.toFixed(2)}`;
            document.getElementById('distanceCharge').textContent = `₹${distanceCharge.toFixed(2)}`;
            document.getElementById('gst').textContent = `₹${gst.toFixed(2)}`;
            document.getElementById('discount').textContent = `-₹${discount.toFixed(2)}`;
            document.getElementById('estimatedFare').textContent = `₹${total.toFixed(2)}`;
        }
    }

    // Apply promo code
    document.getElementById('applyPromo').addEventListener('click', function() {
        const promoInput = document.getElementById('promo');
        const promoCode = promoInput.value.toUpperCase();

        if (promoCodes[promoCode]) {
            appliedDiscount = promoCodes[promoCode];
            alert(`Promo code applied! You got ${appliedDiscount}% discount`);
            updateFareEstimate();
        } else {
            alert('Invalid promo code');
        }
    });

    // City selection change
    document.getElementById('city').addEventListener('change', function() {
        if (selectedCabType) {
            updateFareEstimate();
        }
    });

    // Language selection
    document.getElementById('language').addEventListener('change', function() {
        // In a real application, implement language translation here
        alert('Language change functionality will be implemented soon');
    });

    // Add minimum date validation
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedCabType) {
            alert('Please select a cab type');
            return;
        }

        const bookingDetails = {
            pickup: document.getElementById('pickup').value,
            dropoff: document.getElementById('dropoff').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            cabType: selectedCabType.type,
            fare: estimatedFare.textContent
        };

        showConfirmationModal(bookingDetails);
    });

    // Show confirmation modal
    function showConfirmationModal(details) {
        const detailsHTML = `
            <p><strong>Pickup:</strong> ${details.pickup}</p>
            <p><strong>Drop-off:</strong> ${details.dropoff}</p>
            <p><strong>Date:</strong> ${details.date}</p>
            <p><strong>Time:</strong> ${details.time}</p>
            <p><strong>Cab Type:</strong> ${details.cabType}</p>
            <p><strong>Estimated Fare:</strong> ${details.fare}</p>
        `;
        
        document.getElementById('bookingDetails').innerHTML = detailsHTML;
        confirmationModal.style.display = 'block';
    }

    // SOS Button functionality
    document.querySelector('.sos-button').addEventListener('click', function() {
        const confirmation = confirm('Do you want to contact emergency services?');
        if (confirmation) {
            window.location.href = 'tel:112';
        }
    });

    // Share ride functionality
    document.querySelector('.share-ride')?.addEventListener('click', function() {
        const rideDetails = {
            bookingId: document.getElementById('bookingId').textContent,
            driver: 'Rajesh Kumar',
            vehicleNo: 'DL 01 AB 1234'
        };

        if (navigator.share) {
            navigator.share({
                title: 'My Cab Ride Details',
                text: `Tracking my ride with Bharat Cabs\nBooking ID: ${rideDetails.bookingId}\nDriver: ${rideDetails.driver}\nVehicle: ${rideDetails.vehicleNo}`
            }).catch(console.error);
        } else {
            alert('Sharing is not supported on this browser');
        }
    });

    // Simulate live tracking
    function startTracking() {
        let progress = 0;
        const progressBar = document.querySelector('.progress');
        const etaTime = document.getElementById('etaTime');
        let minutes = 12;

        trackingInterval = setInterval(() => {
            progress += 1;
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            if (progress % 10 === 0) {
                minutes = Math.max(0, minutes - 1);
                if (etaTime) {
                    etaTime.textContent = `${minutes} mins`;
                }
            }

            if (progress >= 100) {
                clearInterval(trackingInterval);
                alert('Your ride has arrived!');
            }
        }, 1000);
    }

    // Confirm booking
    confirmBtn.addEventListener('click', function() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }

        confirmationModal.style.display = 'none';
        isBookingConfirmed = true;
        showSuccessModal();

        // Show tracking modal after 2 seconds
        setTimeout(() => {
            document.getElementById('trackingModal').style.display = 'block';
            startTracking();
        }, 2000);
    });

    // Show success modal
    function showSuccessModal() {
        const bookingId = generateBookingId();
        document.getElementById('bookingId').textContent = bookingId;
        successModal.style.display = 'block';
    }

    // Generate random booking ID
    function generateBookingId() {
        return 'QB' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Modal close buttons
    closeBtn.addEventListener('click', () => confirmationModal.style.display = 'none');
    cancelBtn.addEventListener('click', () => confirmationModal.style.display = 'none');
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        bookingForm.reset();
        cabTypes.forEach(cab => cab.classList.remove('selected'));
        selectedCabType = null;
        estimatedFare.textContent = '₹0.00';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target == confirmationModal) {
            confirmationModal.style.display = 'none';
        }
        if (e.target == successModal) {
            successModal.style.display = 'none';
        }
    });

    // Cancel booking
    cancelBtn.addEventListener('click', function() {
        if (isBookingConfirmed) {
            const cancelConfirm = confirm('Are you sure you want to cancel your booking? Cancellation charges may apply.');
            if (cancelConfirm) {
                clearInterval(trackingInterval);
                alert('Booking cancelled successfully. Cancellation confirmation has been sent to your email.');
                confirmationModal.style.display = 'none';
                resetBookingForm();
            }
        } else {
            confirmationModal.style.display = 'none';
        }
    });

    // Reset booking form
    function resetBookingForm() {
        bookingForm.reset();
        cabTypes.forEach(cab => cab.classList.remove('selected'));
        selectedCabType = null;
        estimatedFare.textContent = '₹0.00';
        document.getElementById('baseFare').textContent = '₹0.00';
        document.getElementById('distanceCharge').textContent = '₹0.00';
        document.getElementById('gst').textContent = '₹0.00';
        document.getElementById('discount').textContent = '-₹0.00';
        appliedDiscount = 0;
        isBookingConfirmed = false;
    }

    // Add smooth animations for cab selection
    cabTypes.forEach(cab => {
        cab.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        cab.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    function showLoading() {
        const loadingHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Processing your request...</p>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }

    function hideLoading() {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}); 