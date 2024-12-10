// Sample data for service providers
const serviceProviders = [
  {
    id: 1,
    name: "Delhi Auto Care",
    photo: "https://images.unsplash.com/photo-1540820658-c04e3ff4c4c9",
    contact: "+91 98765-43210",
    location: "Delhi",
    rating: 4.5,
    specialization: "Complete Car Service",
    address: "Karol Bagh, New Delhi",
  },
  {
    id: 2,
    name: "Mumbai Motors",
    photo: "https://images.unsplash.com/photo-1625047509168-a7026ade842b",
    contact: "+91 98765-43211",
    location: "Mumbai",
    rating: 4.8,
    specialization: "Luxury Car Specialist",
    address: "Andheri West, Mumbai",
  },
  {
    id: 3,
    name: "Krishna Car Care",
    photo: "https://images.unsplash.com/photo-1632823471565-1ecdf5c6da05",
    contact: "+91 98765-43212",
    location: "Mathura",
    rating: 4.6,
    specialization: "General Service",
    address: "Krishna Nagar, Mathura",
  },
  {
    id: 4,
    name: "Bangalore Auto Tech",
    photo: "https://images.unsplash.com/photo-1629019725048-75f3fd5edd1c",
    contact: "+91 98765-43213",
    location: "Bangalore",
    rating: 4.9,
    specialization: "Electric Vehicle Service",
    address: "Koramangala, Bangalore",
  },
  {
    id: 5,
    name: "Chennai Car Solutions",
    photo: "https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93",
    contact: "+91 98765-43214",
    location: "Chennai",
    rating: 4.7,
    specialization: "AC Service Specialist",
    address: "T Nagar, Chennai",
  },
  {
    id: 6,
    name: "Agra Auto Works",
    photo: "https://images.unsplash.com/photo-1632823470534-5d0a8e4e1904",
    contact: "+91 98765-43215",
    location: "Agra",
    rating: 4.4,
    specialization: "Body Work Expert",
    address: "Taj Ganj, Agra",
  },
  {
    id: 7,
    name: "Kolkata Car Care",
    photo: "https://images.unsplash.com/photo-1632823471417-c6e63e1d1b9c",
    contact: "+91 98765-43216",
    location: "Kolkata",
    rating: 4.8,
    specialization: "Engine Specialist",
    address: "Park Street, Kolkata",
  },
  {
    id: 8,
    name: "Hyderabad Motors",
    photo: "https://images.unsplash.com/photo-1632823470604-3e0b23747d71",
    contact: "+91 98765-43217",
    location: "Hyderabad",
    rating: 4.6,
    specialization: "Premium Car Service",
    address: "Banjara Hills, Hyderabad",
  },
  {
    id: 9,
    name: "Pune Auto Tech",
    photo: "https://images.unsplash.com/photo-1632823471646-7d8e13efcd51",
    contact: "+91 98765-43218",
    location: "Pune",
    rating: 4.9,
    specialization: "Multi-Brand Service",
    address: "Koregaon Park, Pune",
  },
  {
    id: 10,
    name: "Jaipur Car Point",
    photo: "https://images.unsplash.com/photo-1632823470642-c9c7e3b46e9a",
    contact: "+91 98765-43219",
    location: "Jaipur",
    rating: 4.7,
    specialization: "Complete Car Solutions",
    address: "MI Road, Jaipur",
  },
];

function searchServices() {
  const location = document.getElementById("location").value;
  const date = document.getElementById("service-date").value;

  if (!location || !date) {
    alert("Please fill in both location and date fields");
    return;
  }

  // Show loader
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <p>Finding service providers in ${location}...</p>
        </div>
    `;
  console.log("Fetching service providers in", location, "for", date);
  // Fetch service providers from API
  fetch(`https://paryatansetu.onrender.com/form/car?city=${location}&date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User data:", data);
      //   const providers = [
      //     {
      //       name: data.data[0].firstName + " " + data.data[0].lastName,
      //       contact: data.data[0].mobileNo + " , " + data.data[0].email,
      //       location: data.data[0].city,
      //       specialization: data.data[0].model,
      //       address: data.data[0].address,
      //     },
      //   ];
      const providers = data.data.map((provider) => ({
        name: provider.firstName + " " + provider.lastName,
        contact: provider.mobileNo + " , " + provider.email,
        location: provider.city,
        specialization: provider.model,
        address: provider.address,
      }));
      console.log(providers);
      displayResults(providers);
    });

  // Simulate API call with setTimeout
  setTimeout(() => {
    // Filter service providers based on location
    // const filteredProviders = serviceProviders.filter(
    //   (provider) => provider.location.toLowerCase() === location.toLowerCase()
    // );
  }, 1500);
}

function displayResults(providers) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (providers.length === 0) {
    resultsContainer.innerHTML =
      '<p style="color: white; text-align: center;">No service providers found in your area</p>';
    return;
  }

  providers.forEach((provider) => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.onclick = () => showProviderDetails(provider);

    card.innerHTML = `
            <img src="${provider.photo}" alt="${provider.name}">
            <h3>${provider.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${provider.address}</p>
            <p><i class="fas fa-phone"></i> ${provider.contact}</p>
            <p><i class="fas fa-star"></i> ${provider.rating}/5</p>
            <p class="specialization"><i class="fas fa-tools"></i> ${provider.specialization}</p>
        `;

    resultsContainer.appendChild(card);
  });
}

function showProviderDetails(provider) {
  alert(`
        Name: ${provider.name}
        Address: ${provider.address}
        Contact: ${provider.contact}
        Rating: ${provider.rating}/5
        Specialization: ${provider.specialization}
        
        Click OK to book an appointment
    `);
}
