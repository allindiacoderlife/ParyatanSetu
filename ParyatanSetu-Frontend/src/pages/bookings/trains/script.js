// Minimum date validation
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Sample train data
const trains = [
    {
        number: "12345",
        name: "Rajdhani Express",
        departure: "06:00",
        arrival: "18:00",
        duration: "12h 00m",
        price: {
            "1A": 3000,
            "2A": 2000,
            "3A": 1500,
            "SL": 800,
            "CC": 600
        }
    },
    {
        number: "67890",
        name: "Shatabdi Express",
        departure: "08:00",
        arrival: "16:00",
        duration: "8h 00m",
        price: {
            "1A": 2500,
            "2A": 1800,
            "3A": 1300,
            "SL": 700,
            "CC": 500
        }
    }
];

// Form submission handler
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    
    if (from === to) {
        alert('Source and destination cannot be the same!');
        return;
    }
    
    displayTrains();
});

function displayTrains() {
    const trainList = document.getElementById('trainList');
    const trainsContainer = trainList.querySelector('.trains-container');
    const selectedClass = document.getElementById('class').value;
    
    trainList.classList.remove('hidden');
    trainsContainer.innerHTML = '';
    
    trains.forEach(train => {
        const trainCard = document.createElement('div');
        trainCard.className = 'train-card';
        trainCard.innerHTML = `
            <h3>${train.name} (${train.number})</h3>
            <p>Departure: ${train.departure} | Arrival: ${train.arrival}</p>
            <p>Duration: ${train.duration}</p>
            <p>Price: ₹${train.price[selectedClass]}</p>
            <div class="discount-section">
                <label for="discount-${train.number}">Select Discount:</label>
                <select id="discount-${train.number}" class="discount-select">
                    <option value="0">No Discount</option>
                    <option value="40">Senior Citizen (40% off)</option>
                    <option value="20">Student (20% off)</option>
                    <option value="30">Armed Forces (30% off)</option>
                </select>
            </div>
            <button onclick="showBookingConfirmation('${train.number}')">Book Now</button>
        `;
        trainsContainer.appendChild(trainCard);
    });
}

function showBookingConfirmation(trainNumber) {
    const selectedTrain = trains.find(train => train.number === trainNumber);
    const passengers = document.getElementById('passengers').value;
    const selectedClass = document.getElementById('class').value;
    const discountSelect = document.querySelector(`#discount-${trainNumber}`);
    const discountPercentage = parseInt(discountSelect.value);
    
    let basePrice = selectedTrain.price[selectedClass] * parseInt(passengers);
    let discount = (basePrice * discountPercentage) / 100;
    let totalPrice = basePrice - discount;

    const modal = document.getElementById('confirmationModal');
    const bookingDetails = document.getElementById('bookingDetails');
    
    bookingDetails.innerHTML = `
        <p><strong>Train:</strong> ${selectedTrain.name}</p>
        <p><strong>Train Number:</strong> ${selectedTrain.number}</p>
        <p><strong>From:</strong> ${document.getElementById('from').value}</p>
        <p><strong>To:</strong> ${document.getElementById('to').value}</p>
        <p><strong>Date:</strong> ${document.getElementById('date').value}</p>
        <p><strong>Class:</strong> ${selectedClass}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <p><strong>Base Price:</strong> ₹${basePrice}</p>
        ${discountPercentage > 0 ? `<p><strong>Discount (${discountPercentage}%):</strong> ₹${discount}</p>` : ''}
        <p><strong>Final Price:</strong> ₹${totalPrice}</p>
    `;
    
    modal.classList.add('show');
}

// Close modal functionality
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('confirmationModal').classList.remove('show');
});

// Confirm booking
document.getElementById('confirmBooking').addEventListener('click', function() {
    const modal = document.getElementById('confirmationModal');
    
    // Show success message
    Swal.fire({
        title: 'Booking Confirmed!',
        text: 'Your ticket has been booked successfully. The ticket details will be sent to your email.',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    modal.classList.remove('show');
    document.getElementById('bookingForm').reset();
    document.getElementById('trainList').classList.add('hidden');
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}); 