document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('serviceProviderForm');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const pincodeInput = document.getElementById('pincode');
    const photoInput = document.getElementById('photo');
    const pricePerHeadInput = document.getElementById('pricePerHead');

    // Indian states and cities data
    const indianStatesAndCities = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Kakinada", "Tirupati", "Rajahmundry", "Kadapa", "Anantapur"],
        "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Tezu", "Bomdila", "Ziro", "Tawang", "Along", "Roing"],
        "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "North Lakhimpur"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Valpoi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Gandhidham"],
        "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
        "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Nahan", "Bilaspur", "Hamirpur", "Dharamshala", "Kullu", "Una", "Palampur"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Dumka", "Phusro"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded"],
        "Manipur": ["Imphal", "Thoubal", "Kakching", "Ukhrul", "Chandel", "Bishnupur", "Senapati", "Churachandpur", "Jiribam", "Moreh"],
        "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Resubelpara", "Baghmara", "Nongpoh", "Mairang", "Khliehriat"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saitual", "Khawzawl", "Hnahthial", "Mamit"],
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Peren", "Phek", "Kiphire"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar"],
        "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Nayabazar", "Ravangla", "Chungthang"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
        "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Sabroom", "Amarpur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Kotdwar"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur"]
    };

    // Populate state dropdown
    Object.keys(indianStatesAndCities).forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Handle state selection
    stateSelect.addEventListener('change', function() {
        const selectedState = this.value;
        citySelect.innerHTML = '<option value="">Select City</option>';
        pincodeInput.value = '';

        if (selectedState && indianStatesAndCities[selectedState]) {
            indianStatesAndCities[selectedState].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // Handle city selection
    citySelect.addEventListener('change', function() {
        pincodeInput.value = '';
        pincodeInput.placeholder = 'Pincode';
    });

    // Validate pincode (6 digits for Indian pincodes)
    pincodeInput.addEventListener('input', function() {
        const pincode = this.value;
        const pincodeRegex = /^[1-9][0-9]{5}$/;

        if (pincodeRegex.test(pincode)) {
            this.setCustomValidity('');
        } else {
            this.setCustomValidity('Please enter a valid 6-digit Indian pincode.');
        }
    });

    // Validate photo file size
    photoInput.addEventListener('change', function() {
        const file = this.files[0];
        const maxSize = 100 * 1024 * 1024; // 100MB in bytes

        if (file && file.size > maxSize) {
            this.setCustomValidity('File size must not exceed 100MB.');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validate price per head
    pricePerHeadInput.addEventListener('input', function() {
        const price = parseFloat(this.value);
        if (isNaN(price) || price < 0) {
            this.setCustomValidity('Please enter a valid positive number for Price per Head.');
        } else {
            this.setCustomValidity('');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Perform final validation
        if (form.checkValidity()) {
            // If the form is valid, you can submit it or process the data
            console.log('Form submitted successfully!');
            // You can add your own logic here to send the form data to a server
        } else {
            // If the form is invalid, show validation messages
            form.reportValidity();
        }
    });
});

