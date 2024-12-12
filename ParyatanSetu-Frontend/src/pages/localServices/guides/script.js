document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const dateInput = document.getElementById("date-input");
  const loader = document.getElementById("loader");
  const noResults = document.getElementById("no-results");

  // Array of valid Indian cities
  const indianCities = [
    "Agra",
    "Ahmedabad",
    "Amritsar",
    "Bangalore",
    "Bhopal",
    "Chandigarh",
    "Chennai",
    "Delhi",
    "Goa",
    "Hyderabad",
    "Jaipur",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Pune",
    "Udaipur",
    "Varanasi",
  ].sort();

  // Create and populate the select element
  function createCitySelect() {
    const wrapper = document.querySelector(".search-input-wrapper");
    const select = document.createElement("select");
    select.id = "city-select";
    select.style.display = "none";

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a city";
    select.appendChild(defaultOption);

    // Add city options
    indianCities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      select.appendChild(option);
    });

    wrapper.appendChild(select);
    return select;
  }

  const citySelect = createCitySelect();

  // Function to filter cities
  function filterCities(searchText) {
    return indianCities.filter((city) =>
      city.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Update datalist with filtered cities
  function updateDatalist(cities) {
    const datalist = document.getElementById("cities-list");
    datalist.innerHTML = cities
      .map((city) => `<option value="${city}">`)
      .join("");
  }

  // Initialize with all cities
  updateDatalist(indianCities);

  // Handle input changes
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (!value) {
      updateDatalist(indianCities);
      return;
    }

    const matches = filterCities(value);
    updateDatalist(matches);

    // Check if input exactly matches a city
    const exactMatch = indianCities.find(
      (city) => city.toLowerCase() === value.toLowerCase()
    );

    if (exactMatch) {
      searchInput.value = exactMatch; // Normalize the case
    }
  });

  // Handle selection
  searchInput.addEventListener("change", (e) => {
    const value = e.target.value.trim();
    const exactMatch = indianCities.find(
      (city) => city.toLowerCase() === value.toLowerCase()
    );

    if (exactMatch) {
      searchInput.value = exactMatch; // Normalize the case
    }
  });

  searchButton.addEventListener("click", performSearch);

  // Replace the guidesData object with this expanded version
  const guidesData = {
    Mumbai: [
      {
        name: "Raj Sharma",
        age: 32,
        languages: ["English", "Hindi", "Marathi"],
        experience: "8 years",
        contact: {
          phone: "+91 98765 43210",
          email: "raj.sharma@email.com",
        },
        services: {
          specialized: [
            "Historical Tours",
            "Food Tours",
            "Bollywood Studio Tours",
          ],
          adventure: ["City Walks", "Local Markets", "Street Photography"],
          spiritual: ["Temple Tours", "Meditation Sessions"],
        },
        rates: {
          hourly: "₹500",
          fullDay: "₹2500",
        },
        availability: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
        rating: 4.8,
        reviews: 127,
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        description:
          "Passionate about showing visitors the real Mumbai, from bustling markets to hidden gems.",
      },
      {
        name: "Priya Patel",
        age: 28,
        languages: ["English", "Hindi", "Gujarati"],
        experience: "5 years",
        contact: {
          phone: "+91 98765 43211",
          email: "priya.p@email.com",
        },
        services: {
          specialized: [
            "Art Gallery Tours",
            "Photography Tours",
            "Fashion District Tours",
          ],
          adventure: ["Street Food Walks", "Night Photography Tours"],
          spiritual: ["Meditation Centers", "Ancient Temples"],
        },
        rates: {
          hourly: "₹400",
          fullDay: "₹2000",
        },
        availability: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        rating: 4.9,
        reviews: 89,
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        description:
          "Specializing in cultural and artistic experiences in Mumbai.",
      },
    ],
    Delhi: [
      {
        name: "Amit Kumar",
        age: 35,
        languages: ["English", "Hindi", "Punjabi"],
        experience: "10 years",
        contact: {
          phone: "+91 98765 43212",
          email: "amit.k@email.com",
        },
        services: {
          specialized: [
            "Heritage Walks",
            "Historical Monuments",
            "Mughal Architecture",
          ],
          adventure: ["Cycling Tours", "Food Trails", "Night Tours"],
          spiritual: ["Religious Sites", "Sufi Shrines", "Temple Complexes"],
        },
        rates: {
          hourly: "₹600",
          fullDay: "₹3000",
        },
        availability: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
        rating: 4.9,
        reviews: 156,
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        description:
          "Expert in Delhi's rich history and architectural heritage.",
      },
    ],
    Bangalore: [
      {
        name: "Karthik Rao",
        age: 30,
        languages: ["English", "Kannada", "Hindi"],
        experience: "6 years",
        contact: {
          phone: "+91 98765 43213",
          email: "karthik.r@email.com",
        },
        services: {
          specialized: [
            "Tech Parks Tour",
            "Brewery Tours",
            "Garden City Tours",
          ],
          adventure: ["Cycling Tours", "Rock Climbing", "Weekend Treks"],
          spiritual: ["Temple Tours", "Meditation Retreats"],
        },
        rates: {
          hourly: "₹450",
          fullDay: "₹2200",
        },
        availability: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Saturday",
          "Sunday",
        ],
        rating: 4.7,
        reviews: 92,
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        description:
          "Showcasing the perfect blend of traditional and modern Bangalore.",
      },
    ],
    Jaipur: [
      {
        name: "Divya Singh",
        age: 29,
        languages: ["English", "Hindi", "French"],
        experience: "7 years",
        contact: {
          phone: "+91 98765 43214",
          email: "divya.s@email.com",
        },
        services: {
          specialized: [
            "Palace Tours",
            "Heritage Photography",
            "Craft Workshops",
          ],
          adventure: ["Desert Safari", "Hot Air Balloon", "Camel Rides"],
          spiritual: ["Temple Tours", "Morning Rituals"],
        },
        rates: {
          hourly: "₹400",
          fullDay: "₹2000",
        },
        availability: ["Monday", "Tuesday", "Thursday", "Friday", "Sunday"],
        rating: 4.9,
        reviews: 143,
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        description:
          "Passionate about sharing the royal heritage of Pink City.",
      },
    ],
    Goa: [
      {
        name: "Marcus Fernandes",
        age: 31,
        languages: ["English", "Portuguese", "Hindi", "Konkani"],
        experience: "9 years",
        contact: {
          phone: "+91 98765 43215",
          email: "marcus.f@email.com",
        },
        services: {
          specialized: [
            "Beach Tours",
            "Heritage Houses",
            "Church Architecture",
          ],
          adventure: ["Water Sports", "Scuba Diving", "Island Hopping"],
          spiritual: ["Old Churches", "Spiritual Retreats"],
        },
        rates: {
          hourly: "₹500",
          fullDay: "₹2500",
        },
        availability: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
        rating: 4.8,
        reviews: 167,
        image: "https://randomuser.me/api/portraits/men/6.jpg",
        description:
          "Expert in Goan culture, history, and adventure activities.",
      },
    ],
    Varanasi: [
      {
        name: "Aditya Tripathi",
        age: 40,
        languages: ["English", "Hindi", "Sanskrit", "Bengali"],
        experience: "15 years",
        contact: {
          phone: "+91 98765 43216",
          email: "aditya.t@email.com",
        },
        services: {
          specialized: [
            "Ganga Aarti Tours",
            "Ancient City Walks",
            "Music Tours",
          ],
          adventure: ["Boat Rides", "Photography Tours", "Food Walks"],
          spiritual: ["Temple Tours", "Meditation Sessions", "Yoga Classes"],
        },
        rates: {
          hourly: "₹350",
          fullDay: "₹1800",
        },
        availability: ["Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
        rating: 4.9,
        reviews: 198,
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        description:
          "Deeply knowledgeable about Varanasi's spiritual and cultural heritage.",
      },
    ],
  };

  // Function to display guides
  function displayGuides(result , city) {
    const guidesResults = document.getElementById("guides-results");
    const loader = document.getElementById("loader");
    const noResults = document.getElementById("no-results");

    // Get guides for the selected city
    const guides = result;

    // Hide loader
    loader.style.display = "none";

    if (guides.length === 0) {
      noResults.style.display = "block";
      guidesResults.innerHTML = "";
      return;
    }

    noResults.style.display = "none";
    guidesResults.innerHTML = `
            <h2>Local Guides in ${city}</h2>
            <div class="guides-container">
                ${guides
                  .map(
                    (guide) => `
                    <div class="guide-card">
                        <div class="guide-profile">
                            <img src="${guide.image}" alt="${
                      guide.name
                    }" class="guide-image">
                            <div class="guide-header">
                                <div class="guide-name-rating">
                                    <h3>${guide.name}</h3>
                                    <div class="rating">
                                        <span class="stars">★</span>
                                        ${guide.rating} (${
                      guide.reviews
                    } reviews)
                                    </div>
                                </div>
                                <p class="guide-description">${
                                  guide.description
                                }</p>
                                <div class="guide-age-exp">
                                    <span>${guide.age} years old</span>
                                    <span>${guide.experience} experience</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="guide-languages">
                            <strong>Languages:</strong> ${guide.languages.join(
                              ", "
                            )}
                        </div>

                        <div class="guide-services">
                            <div class="service-section">
                                <h4>🎯 Specialized Tours:</h4>
                                <ul>${guide.services.specialized
                                  .map((s) => `<li>${s}</li>`)
                                  .join("")}</ul>
                            </div>
                            <div class="service-section">
                                <h4>🏃‍♂️ Adventure & Outdoors:</h4>
                                <ul>${guide.services.adventure
                                  .map((s) => `<li>${s}</li>`)
                                  .join("")}</ul>
                            </div>
                            <div class="service-section">
                                <h4>🕉️ Spiritual & Religious:</h4>
                                <ul>${guide.services.spiritual
                                  .map((s) => `<li>${s}</li>`)
                                  .join("")}</ul>
                            </div>
                        </div>

                        <div class="guide-rates">
                            <div class="rate-item">
                                <span>Hourly Rate:</span>
                                <strong>${guide.rates.hourly}</strong>
                            </div>
                            <div class="rate-item">
                                <span>Full Day Rate:</span>
                                <strong>${guide.rates.fullDay}</strong>
                            </div>
                        </div>

                        <div class="guide-availability">
                            <strong>Available on:</strong> ${guide.availability.join(
                              ", "
                            )}
                        </div>

                        <div class="guide-contact">
                            <button class="contact-btn phone-btn" onclick="window.location.href='tel:${
                              guide.contact.phone
                            }'">
                                📞 Call Guide
                            </button>
                            <button class="contact-btn email-btn" onclick="window.location.href='mailto:${
                              guide.contact.email
                            }'">
                                ✉️ Email Guide
                            </button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // Update performSearch function
  function performSearch(e) {
    e.preventDefault();

    const destination = searchInput.value.trim();
    const selectedDate = dateInput.value;

    if (!destination || !selectedDate) {
      alert("Please enter both city and date.");
      return;
    }

    const isValidCity = indianCities.some(
      (city) => city.toLowerCase() === destination.toLowerCase()
    );

    if (!isValidCity) {
      alert("Please select a valid Indian city from the list");
      return;
    }

    // Show loader
    const loader = document.getElementById("loader");
    const noResults = document.getElementById("no-results");
    const guidesResults = document.getElementById("guides-results");

    console.log(destination, selectedDate);

    fetch(
      `https://paryatansetu.onrender.com/form/guide?city=${destination}&date=${selectedDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const providers = data.data.map((provider) => ({
          name: provider.firstName + " " + provider.lastName,
          age: provider.age,
          languages: provider.languages,
          experience: provider.experience,
          contact: {
            phone: provider.mobileNo + "," + provider.alternateNo,
            email: provider.email,
          },
          services: {
            specialized: [
              "Ganga Aarti Tours",
              "Ancient City Walks",
              "Music Tours",
            ],
            adventure: ["Boat Rides", "Photography Tours", "Food Walks"],
            spiritual: provider.tourType,
          },
          rates: {
            hourly: "₹350",
            fullDay: "₹1800",
          },
          availability: provider.availability,
          rating: 4.9,
          reviews: 198,
          image: "https://randomuser.me/api/portraits/men/7.jpg",
          description:
            `Deeply knowledgeable about ${provider.city} spiritual and cultural heritage.`,
        }));
        loader.style.display = "block";
        noResults.style.display = "none";
        guidesResults.innerHTML = "";

        // Simulate API call
        setTimeout(() => {
            displayGuides(providers , destination);
        }, 1000);
      });
  }
});
