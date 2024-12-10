// List of major cities
const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Goa",
  "Jaipur",
  "Kochi",
  "Thiruvananthapuram",
  "Lucknow",
  "Varanasi",
  "Guwahati",
  "Bhubaneswar",
  "Chandigarh",
  "Srinagar",
  "Port Blair",
  "Leh",
];

// Populate city dropdowns
function populateCityDropdowns() {
  const departure = document.getElementById("departure");
  const arrival = document.getElementById("arrival");

  cities.sort().forEach((city) => {
    departure.add(new Option(city, city));
    arrival.add(new Option(city, city));
  });
}

// Handle trip type selection
document.querySelectorAll('input[name="tripType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const returnDateGroup = document.getElementById("returnDateGroup");
    if (this.value === "oneWay") {
      returnDateGroup.style.display = "none";
      document.getElementById("returnDate").required = false;
    } else {
      returnDateGroup.style.display = "block";
      document.getElementById("returnDate").required = true;
    }
  });
});

// Passenger count handlers
function increaseValue(id) {
  const input = document.getElementById(id);
  const currentValue = parseInt(input.value);
  if (currentValue < parseInt(input.max)) {
    input.value = currentValue + 1;
  }
}

function decreaseValue(id) {
  const input = document.getElementById(id);
  const currentValue = parseInt(input.value);
  if (currentValue > parseInt(input.min)) {
    input.value = currentValue - 1;
  }
}

// Set minimum dates for departure and return
function setMinDates() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("departureDate").min = today;
  document.getElementById("returnDate").min = today;

  // Update return date min when departure date changes
  document
    .getElementById("departureDate")
    .addEventListener("change", function () {
      document.getElementById("returnDate").min = this.value;
    });
}

// Form submission handler
document
  .getElementById("flightBookingForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Collect form data
    const formData = {
      tripType: document.querySelector('input[name="tripType"]:checked').value,
      departure: document.getElementById("departure").value,
      arrival: document.getElementById("arrival").value,
      departureDate: document.getElementById("departureDate").value,
      returnDate: document.getElementById("returnDate").value,
      adults: document.getElementById("adults").value,
      children: document.getElementById("children").value,
      infants: document.getElementById("infants").value,
      cabinClass: document.getElementById("cabinClass").value,
    };

    // Validate same city selection
    if (formData.departure === formData.arrival) {
      alert("Departure and arrival cities cannot be the same");
      return;
    }

    // Send form data to the server
    fetch("https://paryatansetu.onrender.com/flight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Receive flight data from the server
        handleGET(formData);
      });
  });

const handlePOST = async (formData) => {
  fetch("https://paryatansetu.onrender.com/flight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Receive flight data from the server
      handleGET(formData);
    });
};

const handleGET = async (formData) => {
  fetch(
    `https://paryatansetu.onrender.com/flight?departure=${formData.departure}&arrival=${formData.arrival}&departureDate=${formData.departureDate}&returnDate=${formData.returnDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const flightOffers = data.data[0].flights[0].flightOffers;
      const flightData = [];

      // Loop through each flight offer
      flightOffers.forEach((offer) => {
        const segments = offer.segments[0].legs[0];
        const airline = segments.carriersData[0].name;
        const logo = segments.carriersData[0].logo;
        const flightNumber = segments.flightInfo.flightNumber;
        const departureTime = new Date(segments.departureTime); // Convert to Date object
        const arrivalTime = new Date(segments.arrivalTime); // Convert to Date object

        // Calculate total flight time in hours
        const totalTime = Math.abs(
          (arrivalTime - departureTime) / (1000 * 60 * 60)
        ).toFixed(2); // in hours

        const price =
          offer.priceBreakdown.carrierTaxBreakdown[0].avgPerAdult.units;
        const stops = 0; // Adjust logic for stops if needed

        // Add data to the flightData array
        flightData.push({
          airline: airline,
          logo: logo,
          flightNumber: flightNumber,
          departureTime: segments.departureTime,
          arrivalTime: segments.arrivalTime,
          duration: totalTime, // Add total time in hours
          price: price,
          stops: stops,
        });
      });

      console.log(flightData);

      // Display flight results
      displayFlightResults(flightData);
    });
};
// Initialize the form
window.onload = function () {
  populateCityDropdowns();
  setMinDates();
};

// Sample flight data
const flights = [
  {
    airline: "Air India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Air_India_logo.svg/2560px-Air_India_logo.svg.png",
    flightNumber: "AI-101",
    departureTime: "06:00",
    arrivalTime: "09:00",
    duration: "3h 00m",
    price: 5999,
    stops: 0,
  },
  {
    airline: "IndiGo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/IndiGo_Airlines_logo.svg/2560px-IndiGo_Airlines_logo.svg.png",
    flightNumber: "6E-345",
    departureTime: "07:30",
    arrivalTime: "10:15",
    duration: "2h 45m",
    price: 4499,
    stops: 0,
  },
  {
    airline: "SpiceJet",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/SpiceJet_logo.svg/2560px-SpiceJet_logo.svg.png",
    flightNumber: "SG-438",
    departureTime: "09:15",
    arrivalTime: "12:30",
    duration: "3h 15m",
    price: 3999,
    stops: 1,
  },
  {
    airline: "Vistara",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vistara-Logo.svg/2560px-Vistara-Logo.svg.png",
    flightNumber: "UK-835",
    departureTime: "08:45",
    arrivalTime: "11:45",
    duration: "3h 00m",
    price: 6499,
    stops: 0,
  },
  {
    airline: "Air India Express",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Air_India_Express_Logo.svg/2560px-Air_India_Express_Logo.svg.png",
    flightNumber: "IX-355",
    departureTime: "10:30",
    arrivalTime: "13:15",
    duration: "2h 45m",
    price: 4299,
    stops: 0,
  },
];

// Loading overlay
function showLoading() {
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(overlay);
}

function hideLoading() {
  const overlay = document.querySelector(".loading-overlay");
  if (overlay) {
    overlay.remove();
  }
}

// Update the displayFlightResults function
function displayFlightResults(flights) {
  showLoading();

  setTimeout(() => {
    const resultsDiv = document.getElementById("flightResults");
    const cardsDiv = document.getElementById("flightCards");
    cardsDiv.innerHTML = "";

    flights.forEach((flight) => {
      const flightCard = document.createElement("div");
      flightCard.className = "flight-card";
      flightCard.innerHTML = `
                <div class="airline-info">
                    <img src="${flight.logo}" alt="${
        flight.airline
      }" class="airline-logo">
                    <div>
                        <div>${flight.airline}</div>
                        <div>${flight.flightNumber}</div>
                        ${
                          flight.stops === 0
                            ? '<span class="airline-badge">Direct</span>'
                            : ""
                        }
                    </div>
                </div>
                <div class="flight-details">
                    <div class="flight-time">${flight.departureTime} → ${
        flight.arrivalTime
      }</div>
                    <div class="flight-duration">${flight.duration} ${
        flight.stops ? "• " + flight.stops + " stop" : "• Non-stop"
      }</div>
                </div>
                <div class="price-section">
                    <div class="price-breakdown">
                        <div class="flight-price">₹${flight.price}</div>
                        <div class="price-details">
                            <div>Base Fare: ₹${(flight.price * 0.7).toFixed(
                              0
                            )}</div>
                            <div>Taxes & Fees: ₹${(flight.price * 0.3).toFixed(
                              0
                            )}</div>
                            <hr>
                            <div><strong>Total: ₹${flight.price}</strong></div>
                        </div>
                    </div>
                    <button class="select-flight-btn" onclick="selectFlight('${
                      flight.flightNumber
                    }')">Select</button>
                </div>
            `;
      cardsDiv.appendChild(flightCard);
    });

    resultsDiv.style.display = "block";
    document.querySelector(".booking-form").style.display = "none";
    hideLoading();
  }, 1500); // Simulated loading delay
}

function selectFlight(flightNumber) {
  document.getElementById("flightResults").style.display = "none";
  document.getElementById("seatSelection").style.display = "block";
  generateSeatMap();
}

function generateSeatMap() {
  const seatMap = document.getElementById("seatMap");
  seatMap.innerHTML = "";

  // Generate 30 seats (5 rows × 6 seats)
  for (let i = 0; i < 30; i++) {
    const seat = document.createElement("div");
    seat.className = "seat available";
    seat.setAttribute(
      "data-seat",
      `${Math.floor(i / 6) + 1}${String.fromCharCode(65 + (i % 6))}`
    );
    seat.onclick = () => toggleSeat(seat);

    // Randomly mark some seats as occupied
    if (Math.random() < 0.3) {
      seat.className = "seat occupied";
      seat.onclick = null;
    }

    seatMap.appendChild(seat);
  }
}

let selectedSeats = [];

function toggleSeat(seatElement) {
  if (seatElement.classList.contains("occupied")) return;

  const seatNumber = seatElement.getAttribute("data-seat");

  if (seatElement.classList.contains("selected")) {
    seatElement.classList.remove("selected");
    selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
  } else {
    seatElement.classList.add("selected");
    selectedSeats.push(seatNumber);
  }

  updateSelectedSeatsInfo();
}

// Add this object for seat prices
const seatPrices = {
  economy: 500,
  premiumEconomy: 1000,
  business: 2500,
  firstClass: 5000,
};

// Update the updateSelectedSeatsInfo function
function updateSelectedSeatsInfo() {
  const cabinClass = document.getElementById("cabinClass").value;
  const seatPrice = seatPrices[cabinClass];

  document.getElementById("selectedSeatsText").textContent =
    selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";
  document.getElementById("totalAmount").textContent = (
    selectedSeats.length * seatPrice
  ).toLocaleString("en-IN");
}

function proceedToPayment() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat to proceed.");
    return;
  }

  // Simulate payment processing
  showLoading();
  setTimeout(() => {
    hideLoading();
    showConfirmation();
  }, 2000);
}

function showConfirmation() {
  const popup = document.getElementById("confirmationPopup");
  const flight = flights[0]; // Get selected flight details
  const pnr = generatePNR();

  // Update confirmation popup with booking details
  document.getElementById("pnrNumber").textContent = pnr;
  document.getElementById("airlineLogo").src = flight.logo;
  document.getElementById("departureCity").textContent =
    document.getElementById("departure").value;
  document.getElementById("arrivalCity").textContent =
    document.getElementById("arrival").value;
  document.getElementById("departureTime").textContent = flight.departureTime;
  document.getElementById("arrivalTime").textContent = flight.arrivalTime;
  document.getElementById("departureDate").textContent =
    document.getElementById("departureDate").value;
  document.getElementById("flightNumber").textContent = flight.flightNumber;
  document.getElementById("cabinClass").textContent =
    document.getElementById("cabinClass").value;
  document.getElementById("seatNumbers").textContent = selectedSeats.join(", ");

  // Calculate and display fare summary
  const basePrice = flight.price;
  const seatPrice = seatPrices[document.getElementById("cabinClass").value];
  const totalSeats = selectedSeats.length;
  const taxes = basePrice * 0.18; // 18% tax
  const total = (basePrice + seatPrice) * totalSeats + taxes;

  document.getElementById("fareSummary").innerHTML = `
        <p>Base Fare (${totalSeats} passenger${totalSeats > 1 ? "s" : ""}): ₹${
    basePrice * totalSeats
  }</p>
        <p>Seat Charges: ₹${seatPrice * totalSeats}</p>
        <p>Taxes & Fees: ₹${taxes}</p>
    `;
  document.getElementById("totalPaid").textContent =
    total.toLocaleString("en-IN");

  // Show passenger list
  const adults = parseInt(document.getElementById("adults").value);
  const children = parseInt(document.getElementById("children").value);
  const infants = parseInt(document.getElementById("infants").value);

  let passengerList = "";
  for (let i = 1; i <= adults; i++) {
    passengerList += `<p>Adult ${i} - Seat ${selectedSeats[i - 1] || "NA"}</p>`;
  }
  for (let i = 1; i <= children; i++) {
    passengerList += `<p>Child ${i} - Seat ${
      selectedSeats[adults + i - 1] || "NA"
    }</p>`;
  }
  for (let i = 1; i <= infants; i++) {
    passengerList += `<p>Infant ${i} - No Seat</p>`;
  }
  document.getElementById("passengerList").innerHTML = passengerList;

  popup.style.display = "flex";
}

function generatePNR() {
  return "PNR" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function downloadTicket() {
  // Implement ticket download functionality
  alert("Ticket download started...");
}

function emailTicket() {
  // Implement email functionality
  alert("Ticket has been sent to your email address.");
}

function closeConfirmation() {
  document.getElementById("confirmationPopup").style.display = "none";
  // Reset form and redirect to home
  window.location.href = "index.html";
}

function goBack() {
  const flightResults = document.getElementById("flightResults");
  const seatSelection = document.getElementById("seatSelection");
  const bookingForm = document.querySelector(".booking-form");

  if (seatSelection.style.display === "block") {
    seatSelection.style.display = "none";
    flightResults.style.display = "block";
  } else if (flightResults.style.display === "block") {
    flightResults.style.display = "none";
    bookingForm.style.display = "block";
  }
}

// Fare filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const fareFilters = document.querySelectorAll(".fare-filter");
  fareFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      fareFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      // Simulate price change based on fare type
      const multiplier = {
        regular: 1,
        flexi: 1.3,
        corporate: 0.9,
      }[this.dataset.fare];

      const priceElements = document.querySelectorAll(".flight-price");
      priceElements.forEach((el) => {
        const basePrice = parseInt(el.textContent.replace(/[^0-9]/g, ""));
        el.textContent = "₹" + Math.round(basePrice * multiplier);
      });
    });
  });
});
