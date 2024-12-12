// DOM elements
const searchInput = document.getElementById('search-input');
const dateInput = document.getElementById('date-input');
const searchButton = document.getElementById('search-button');
const loader = document.getElementById('loader');
const noResults = document.getElementById('no-results');
const resultsContainer = document.getElementById('results-container');

// Dummy data with lowercase keys
const dummyData = {
    'delhi': [
        {
            name: "Paranthe Wali Gali Dhaba",
            type: "Dhaba",
            cuisine: ["North Indian", "Street Food"],
            foodType: ["Vegetarian"],
            rating: 4.5,
            priceRange: "₹100-300",
            pricePerMeal: "₹150",
            image: "https://via.placeholder.com/150",
            speciality: "Famous for different varieties of paranthas",
            openingHours: "7:00 AM - 10:00 PM",
            amenities: ["Outdoor Seating", "Takeaway Available"],
            popularDishes: ["Aloo Parantha", "Paneer Parantha", "Lassi"],
            address: "Chandni Chowk, Old Delhi",
            contact: {
                phone: "+91-9876543210",
                email: "paranthe.wali@email.com",
                website: "www.paranthewali.com"
            }
        },
        {
            name: "Karim's",
            type: "Restaurant",
            cuisine: ["Mughlai", "North Indian"],
            foodType: ["Non-Vegetarian"],
            rating: 4.8,
            priceRange: "₹200-600",
            pricePerMeal: "₹400",
            image: "https://via.placeholder.com/150",
            speciality: "Authentic Mughlai cuisine since 1913",
            openingHours: "11:00 AM - 11:00 PM",
            amenities: ["AC Dining", "Free Wi-Fi", "Parking Available"],
            popularDishes: ["Mutton Biryani", "Butter Chicken", "Kebabs"],
            address: "Jama Masjid, Old Delhi"
        }
    ],
    'chennai': [
        {
            name: "Saravana Bhavan",
            type: "Restaurant",
            cuisine: ["South Indian", "Tamil"],
            foodType: ["Vegetarian"],
            rating: 4.6,
            priceRange: "₹150-400",
            pricePerMeal: "₹200",
            image: "https://via.placeholder.com/150",
            speciality: "Authentic South Indian meals",
            openingHours: "6:30 AM - 11:00 PM",
            amenities: ["AC Dining", "Free Wi-Fi", "Family Friendly"],
            popularDishes: ["Masala Dosa", "Filter Coffee", "Idli Sambar"],
            address: "Anna Nagar, Chennai"
        },
        {
            name: "Murugan Idli Shop",
            type: "Quick Service",
            cuisine: ["South Indian"],
            foodType: ["Vegetarian"],
            rating: 4.4,
            priceRange: "₹50-200",
            pricePerMeal: "₹100",
            image: "https://via.placeholder.com/150",
            speciality: "Famous soft idlis",
            openingHours: "7:00 AM - 10:00 PM",
            amenities: ["Quick Service", "Takeaway"],
            popularDishes: ["Idli", "Podi Dosa", "Vada"],
            address: "T. Nagar, Chennai"
        }
    ],
    'kolkata': [
        {
            name: "Peter Cat",
            type: "Restaurant",
            cuisine: ["Continental", "Indian", "Bengali"],
            foodType: ["Non-Vegetarian", "Vegetarian"],
            rating: 4.7,
            priceRange: "₹500-1500",
            pricePerMeal: "₹800",
            image: "https://via.placeholder.com/150",
            speciality: "Famous for Chelo Kebab",
            openingHours: "11:00 AM - 11:00 PM",
            amenities: ["AC Dining", "Full Bar", "Valet Parking"],
            popularDishes: ["Chelo Kebab", "Fish Orly", "Sizzlers"],
            address: "Park Street, Kolkata"
        },
        {
            name: "Arsalan",
            type: "Restaurant",
            cuisine: ["Mughlai", "Bengali"],
            foodType: ["Non-Vegetarian"],
            rating: 4.5,
            priceRange: "₹300-800",
            pricePerMeal: "₹400",
            image: "https://via.placeholder.com/150",
            speciality: "Best Biryani in Kolkata",
            openingHours: "11:00 AM - 1:00 AM",
            amenities: ["AC Dining", "Takeaway", "Home Delivery"],
            popularDishes: ["Kolkata Biryani", "Mutton Chaap", "Firni"],
            address: "Park Circus, Kolkata"
        }
    ],
    'jaipur': [
        {
            name: "Lassiwala",
            type: "Street Food",
            cuisine: ["Rajasthani", "Beverages"],
            foodType: ["Vegetarian"],
            rating: 4.6,
            priceRange: "₹30-100",
            pricePerMeal: "₹50",
            image: "https://via.placeholder.com/150",
            speciality: "Famous thick lassi since 1944",
            openingHours: "7:00 AM - 4:00 PM",
            amenities: ["Takeaway"],
            popularDishes: ["Malai Lassi", "Plain Lassi"],
            address: "MI Road, Jaipur"
        },
        {
            name: "Chokhi Dhani",
            type: "Theme Restaurant",
            cuisine: ["Rajasthani"],
            foodType: ["Vegetarian"],
            rating: 4.7,
            priceRange: "₹1000-2000",
            pricePerMeal: "₹1500",
            image: "https://via.placeholder.com/150",
            speciality: "Traditional Rajasthani Thali with cultural experience",
            openingHours: "5:00 PM - 11:00 PM",
            amenities: ["Cultural Shows", "AC Dining", "Valet Parking", "Resort"],
            popularDishes: ["Rajasthani Thali", "Dal Baati Churma", "Gatte ki Sabzi"],
            address: "Tonk Road, Jaipur"
        }
    ],
    'hyderabad': [
        {
            name: "Paradise Biryani",
            type: "Restaurant",
            cuisine: ["Hyderabadi", "Mughlai"],
            foodType: ["Non-Vegetarian", "Vegetarian"],
            rating: 4.5,
            priceRange: "₹300-800",
            pricePerMeal: "₹400",
            image: "https://via.placeholder.com/150",
            speciality: "World Famous Hyderabadi Biryani",
            openingHours: "11:00 AM - 11:00 PM",
            amenities: ["AC Dining", "Parking", "Home Delivery"],
            popularDishes: ["Hyderabadi Biryani", "Double Ka Meetha", "Qubani Ka Meetha"],
            address: "Secunderabad, Hyderabad"
        },
        {
            name: "Cafe Bahar",
            type: "Restaurant",
            cuisine: ["Hyderabadi", "North Indian"],
            foodType: ["Non-Vegetarian"],
            rating: 4.3,
            priceRange: "₹200-600",
            pricePerMeal: "₹300",
            image: "https://via.placeholder.com/150",
            speciality: "Famous for Biryani and Kebabs",
            openingHours: "11:30 AM - 11:30 PM",
            amenities: ["AC Dining", "Takeaway"],
            popularDishes: ["Chicken Biryani", "Mutton Kebabs", "Haleem"],
            address: "Old City, Hyderabad"
        }
    ],
    'goa': [
        {
            name: "Britto's",
            type: "Beach Restaurant",
            cuisine: ["Goan", "Seafood", "Continental"],
            foodType: ["Non-Vegetarian", "Vegetarian"],
            rating: 4.4,
            priceRange: "₹800-2000",
            pricePerMeal: "₹1000",
            image: "https://via.placeholder.com/150",
            speciality: "Fresh Seafood with Beach View",
            openingHours: "11:00 AM - 12:00 AM",
            amenities: ["Beach View", "Full Bar", "Live Music"],
            popularDishes: ["Goan Fish Curry", "Butter Garlic Prawns", "Fish Recheado"],
            address: "Baga Beach, North Goa"
        },
        {
            name: "Vinayak Family Restaurant",
            type: "Local Restaurant",
            cuisine: ["Goan", "Indian"],
            foodType: ["Non-Vegetarian", "Vegetarian"],
            rating: 4.3,
            priceRange: "₹300-800",
            pricePerMeal: "₹400",
            image: "https://via.placeholder.com/150",
            speciality: "Authentic Goan Food",
            openingHours: "11:00 AM - 11:00 PM",
            amenities: ["AC Dining", "Family Friendly"],
            popularDishes: ["Xacuti", "Vindaloo", "Sorpotel"],
            address: "Panjim, Goa"
        }
    ]
};

// Search functionality
searchButton.addEventListener('click', handleSearch);

function handleSearch() {
    // Get the input value and convert to lowercase for comparison
    const searchTerm = searchInput.value.toLowerCase().trim();
    const date = dateInput.value;

    // Validation
    if (!searchTerm || !date) {
        alert('Please select both city and date');
        return;
    }

    // Show loader and hide previous results
    loader.style.display = 'block';
    noResults.style.display = 'none';
    resultsContainer.innerHTML = '';

    // Simulate API call delay
    setTimeout(() => {
        loader.style.display = 'none';

        // Get results directly using lowercase key
        const results = dummyData[searchTerm];

        if (!results) {
            noResults.style.display = 'block';
            resultsContainer.innerHTML = '';
        } else {
            noResults.style.display = 'none';
            displayResults(results);
        }
    }, 1000);
}

// Handle input selection
searchInput.addEventListener('input', function(e) {
    const value = e.target.value;
    if (value) {
        const searchTerm = value.toLowerCase();
        if (dummyData[searchTerm]) {
            // Format the display value but keep the actual value lowercase
            this.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
    }
});

function displayResults(results) {
    resultsContainer.innerHTML = results.map(place => `
        <div class="place-card">
            <img src="${place.image}" alt="${place.name}">
            <div class="place-info">
                <h3>${place.name}</h3>
                <p class="type">${place.type}</p>
                <p class="cuisine">Cuisine: ${place.cuisine.join(', ')}</p>
                <p class="food-type">Food Type: ${place.foodType.join(', ')}</p>
                <p class="rating">Rating: ⭐ ${place.rating}</p>
                <p class="price">Price Range: ${place.priceRange}</p>
                <p class="meal-price">Average Meal Cost: ${place.pricePerMeal}</p>
                <p class="hours">Hours: ${place.openingHours}</p>
                <p class="speciality">${place.speciality}</p>
                <div class="amenities">
                    <p class="amenities-title">Amenities:</p>
                    <ul>
                        ${place.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                    </ul>
                </div>
                <div class="popular-dishes">
                    <p class="dishes-title">Popular Dishes:</p>
                    <ul>
                        ${place.popularDishes.map(dish => `<li>${dish}</li>`).join('')}
                    </ul>
                </div>
                <div class="contact-info">
                    <p class="contact-title">Contact Details:</p>
                    <p>📞 ${place.contact?.phone || 'N/A'}</p>
                    <p>✉️ ${place.contact?.email || 'N/A'}</p>
                    <p>🌐 ${place.contact?.website || 'N/A'}</p>
                </div>
                <p class="address">📍 ${place.address}</p>
            </div>
        </div>
    `).join('');
}

// Add CSS for contact information styling
const style = document.createElement('style');
style.textContent = `
    .contact-info {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eee;
    }

    .contact-title {
        color: #1a1a1a;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .contact-info p {
        margin: 5px 0;
        color: #666;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// Add event listener for input changes to normalize the input
searchInput.addEventListener('change', function() {
    // Convert first letter of each word to uppercase for display
    let value = this.value.toLowerCase().trim();
    if (value) {
        this.value = value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
});