// Website data structure containing all services and pages
const websiteData = [
    // Transportation
    {
        id: 1,
        title: "Flight Bookings",
        description: "Book domestic and international flights for your journey",
        category: "Transportation",
        image: "../imageSection/flight.jpg",
        url: "../bookings/flights/index.html"
    },
    {
        id: 2,
        title: "Train Tickets",
        description: "Book train tickets across India with ease",
        category: "Transportation",
        image: "../imageSection/train.jpg",
        url: "../bookings/trains/index.html"
    },
    {
        id: 3,
        title: "Cab Services",
        description: "Book cabs for local and outstation travel",
        category: "Transportation",
        image: "../imageSection/carpooling.jpg",
        url: "../bookings/cabs/index.html"
    },

    // Accommodation
    {
        id: 4,
        title: "Hotels",
        description: "Find and book hotels across destinations",
        category: "Accommodation",
        image: "../imageSection/hotel.jpg",
        url: "../bookings/hotels/index.html"
    },
    {
        id: 5,
        title: "Local Rooms",
        description: "Stay with local families for an authentic experience",
        category: "Accommodation",
        image: "../imageSection/localrooms.jpeg",
        url: "../localServices/rooms/local-rooms.html"
    },

    // Local Services
    {
        id: 6,
        title: "Local Guides",
        description: "Connect with experienced local guides",
        category: "Local Services",
        image: "../imageSection/localGuide.jpg",
        url: "../localServices/guides/index.html"
    },
    {
        id: 7,
        title: "Local Cuisine",
        description: "Experience authentic local food and home chefs",
        category: "Local Services",
        image: "../imageSection/food.jpg",
        url: "../localServices/cuisine/index.html"
    },
    {
        id: 8,
        title: "Car Pooling",
        description: "Share rides with locals and fellow travelers",
        category: "Local Services",
        image: "../imageSection/carpooling.jpg",
        url: "../localServices/carpooling/index.html"
    },

    // Government Schemes
    {
        id: 9,
        title: "Swadesh Darshan",
        description: "Integrated development of theme-based tourist circuits",
        category: "Government Schemes",
        image: "../imageSection/swadesh.jpeg",
        url: "../GovernmentSchemes/SwadeshDarshan.html"
    },
    {
        id: 10,
        title: "PRASHAD Scheme",
        description: "Pilgrimage Rejuvenation and Spiritual Heritage Augmentation Drive",
        category: "Government Schemes",
        image: "../imageSection/prashad.jpeg",
        url: "../GovernmentSchemes/PrashadScheme.html"
    },
    {
        id: 11,
        title: "Dekho Apna Desh",
        description: "Initiative to encourage Indians to travel within the country",
        category: "Government Schemes",
        image: "../imageSection/dekho.jpg",
        url: "../GovernmentSchemes/DekhoApnaDeshScheme.html"
    },
    {
        id: 12,
        title: "Adopt a Heritage",
        description: "Participate in developing tourist amenities at heritage sites",
        category: "Government Schemes",
        image: "../imageSection/adoptheritage.webp",
        url: "../GovernmentSchemes/AdoptAHeritage.html"
    },

    // Features
    {
        id: 13,
        title: "Virtual Glance",
        description: "Experience destinations virtually with AR/VR technology",
        category: "Features",
        image: "../imageSection/title card.png",
        url: "../vr/vrviews.html"
    },
    {
        id: 14,
        title: "Plan a Trip",
        description: "Create your perfect itinerary with our planning tools",
        category: "Features",
        image: "../imageSection/planAtriptitle.png",
        url: "../plan/plan.html"
    },
    {
        id: 15,
        title: "Events and Festivals",
        description: "Discover India's vibrant cultural festivals and events",
        category: "Features",
        image: "../imageSection/festival.jpg",
        url: "../EventPage/event.html"
    }
];

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestions');
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    // Function to show suggestions
    function showSuggestions(query) {
        const matchingItems = websiteData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        suggestionsContainer.innerHTML = '';
        
        if (query.length > 0 && matchingItems.length > 0) {
            matchingItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <strong>${item.title}</strong> 
                    <span class="result-category">${item.category}</span>
                `;
                div.addEventListener('click', () => {
                    window.location.href = item.url;
                });
                suggestionsContainer.appendChild(div);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Function to display search results
    function displayResults(query) {
        const results = websiteData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.innerHTML = `
                <img src="${result.image}" alt="${result.title}" class="result-image">
                <div class="result-content">
                    <h3 class="result-title">${result.title}</h3>
                    <p class="result-description">${result.description}</p>
                    <span class="result-category">${result.category}</span>
                </div>
            `;
            resultCard.addEventListener('click', () => {
                window.location.href = result.url;
            });
            searchResults.appendChild(resultCard);
        });
    }

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            suggestionsContainer.style.display = 'none';
            displayResults(searchInput.value);
        }
    });

    searchButton.addEventListener('click', () => {
        suggestionsContainer.style.display = 'none';
        displayResults(searchInput.value);
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
