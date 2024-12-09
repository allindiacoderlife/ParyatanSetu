const form = document.getElementById("tripForm");

document.addEventListener("DOMContentLoaded", function () {
  const priceSlider = document.getElementById("priceSlider");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  // Update input fields when slider changes
  priceSlider.addEventListener("input", function () {
    const value = parseInt(this.value);
    minPrice.value = Math.max(0, value - 20000);
    maxPrice.value = value;
  });

  // Update slider when min price changes
  minPrice.addEventListener("input", function () {
    const min = parseInt(this.value) || 0;
    const max = parseInt(maxPrice.value) || 100000;
    if (min > max) {
      this.value = max;
    }
    updateSlider();
  });

  // Update slider when max price changes
  maxPrice.addEventListener("input", function () {
    const min = parseInt(minPrice.value) || 0;
    const max = parseInt(this.value) || 100000;
    if (max < min) {
      this.value = min;
    }
    updateSlider();
  });

  function updateSlider() {
    const max = parseInt(maxPrice.value) || 100000;
    priceSlider.value = max;
  }
});

function generateTravelPlan() {
  // Get form values
  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const budget = document.getElementById("budget").value;
  const requirements = document.getElementById("requirements").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  // Add price range to the preferences object
  const priceRange = {
    min: parseInt(minPrice) || 0,
    max: parseInt(maxPrice) || 100000,
  };

  // Get selected preferences
  const preferences = Array.from(
    document.querySelectorAll('.chip input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);

  // Show loading state
  showLoadingState();

  // Simulate API call delay
  setTimeout(() => {
    // Generate mock travel plan with price range
    const travelPlan = generateMockTravelPlan(
      destination,
      startDate,
      endDate,
      budget,
      preferences,
      priceRange
    );

    // Display results
    displayResults(travelPlan);
  }, 2000);
}

function showLoadingState() {
  document.getElementById("resultsSection").style.display = "block";
  const loadingHTML =
    '<div class="loading">Generating your perfect travel plan... <i class="fas fa-spinner fa-spin"></i></div>';

  document.getElementById("itineraryContent").innerHTML = loadingHTML;
  document.getElementById("accommodationsContent").innerHTML = loadingHTML;
  document.getElementById("activitiesContent").innerHTML = loadingHTML;
  document.getElementById("transportationContent").innerHTML = loadingHTML;
  document.getElementById("virtualTourContent").innerHTML = loadingHTML;
}

function generateMockTravelPlan(
  destination,
  startDate,
  endDate,
  budget,
  preferences,
  priceRange
) {
  // Mock data - replace with actual AI-generated content
  return {
    itinerary: `
            <div class="day-plan">
                <h4>Day 1 - Welcome to ${destination}</h4>
                <ul>
                    <li>Morning: Hotel check-in and local breakfast</li>
                    <li>Afternoon: City orientation tour</li>
                    <li>Evening: Welcome dinner at local restaurant</li>
                </ul>
            </div>
        `,
    accommodations: `
            <div class="accommodation-card">
                <h4>Recommended Hotel</h4>
                <p>⭐⭐⭐⭐</p>
                <p>Grand ${destination} Hotel</p>
                <p>Price Range: ₹${priceRange.min.toLocaleString()} - ₹${priceRange.max.toLocaleString()}</p>
                <button class="view-details">View Details</button>
            </div>
        `,
    activities: `
            <div class="activities-list">
                ${preferences
                  .map(
                    (pref) => `
                    <div class="activity-item">
                        <i class="fas fa-check-circle"></i>
                        ${getActivityByPreference(pref)}
                    </div>
                `
                  )
                  .join("")}
            </div>
        `,
    transportation: `
            <div class="transport-options">
                <div class="transport-card">
                    <i class="fas fa-plane"></i>
                    <h4>Flight Options</h4>
                    <p>Multiple daily flights available</p>
                    <button class="view-details">Check Flights</button>
                </div>
                <div class="transport-card">
                    <i class="fas fa-taxi"></i>
                    <h4>Local Transport</h4>
                    <p>Taxi, bus, and metro services</p>
                </div>
            </div>
        `,
    virtualTour: `
            <div class="virtual-tour-preview">
                <div class="tour-card">
                    <img src="https://via.placeholder.com/400x200" alt="Virtual Tour Preview">
                    <h4>360° Virtual Tour Available</h4>
                    <p>Experience ${destination} before you arrive!</p>
                    <button class="start-tour">Start Virtual Tour</button>
                </div>
            </div>
        `,
  };
}

function getBudgetRange(budget) {
  const ranges = {
    BEST: "$500-1000/night",
    CHEAPEST: "$300-500/night",
    FASTEST: "$150-300/night",
  };
  return ranges[budget] || "$150-300/night";
}

function getActivityByPreference(preference) {
  const activities = {
    adventure: "Mountain hiking and zip-lining experience",
    culture: "Historical sites and museum tours",
    relaxation: "Spa day and beach relaxation",
    food: "Local cuisine food tour",
    family: "Family-friendly theme park visit",
  };
  return activities[preference] || "Sightseeing tour";
}

function displayResults(travelPlan) {
  document.getElementById("itineraryContent").innerHTML = travelPlan.itinerary;
  document.getElementById("accommodationsContent").innerHTML =
    travelPlan.accommodations;
  document.getElementById("activitiesContent").innerHTML =
    travelPlan.activities;
  document.getElementById("transportationContent").innerHTML =
    travelPlan.transportation;
  document.getElementById("virtualTourContent").innerHTML =
    travelPlan.virtualTour;
}

// Handle form submission

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const sessionId = "session_" + Math.random().toString(36).substr(2, 9);
  const fromId = document.getElementById("fromId").value;
  const toId = document.getElementById("toId").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const budget = document.getElementById("budget").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const preferences = Array.from(
    document.querySelectorAll('.chip input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const chat = document.getElementById("requirements").value;
  const uid = "8923667469";
  const data = {
    fromId,
    toId,
    startDate,
    endDate,
    budget,
    minPrice,
    maxPrice,
    preferences,
    sessionId,
    uid,
    chat,
  };

  console.log(data);

  fetch("https://white827.app.n8n.cloud/webhook/web" , {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
  })
  setTimeout(() => {
    handlefetch();
  }, 20000);
});

const handlefetch = async () => {
  const resultsSection = document.getElementById("resultsSection");
  fetch("https://paryatansetu.onrender.com/feed?uid=8923667469", {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User data:", data);
      document.getElementById("result").textContent = data.data.message;
      resultsSection.style.display = "block";
    });
};
