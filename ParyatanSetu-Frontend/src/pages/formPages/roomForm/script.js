document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('serviceProviderForm');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const pincodeInput = document.getElementById('pincode');
    const photoInput = document.getElementById('photo');
    const electricityRange = document.getElementById('electricityAvailability');
    const waterRange = document.getElementById('waterAvailability');
    const electricityValue = document.getElementById('electricityValue');
    const waterValue = document.getElementById('waterValue');
    let base64String = '';

    const indianStatesAndCities = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur", "Bhimavaram", "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Srikakulam", "Narasaraopet", "Tadipatri", "Tadepalligudem", "Chilakaluripet", "Yemmiganur", "Kadiri", "Chirala", "Anakapalle", "Kavali", "Palacole", "Sullurpeta", "Tanuku", "Gudur", "Mandapeta", "Macherla", "Bapatla", "Nagari", "Rayachoti", "Pithapuram", "Punganur", "Nidadavole", "Pileru", "Rajampet", "Kandukur"],
        "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Tezu", "Bomdila", "Ziro", "Tawang", "Along", "Roing", "Anini", "Daporijo", "Yingkiong", "Seppa", "Khonsa", "Changlang", "Aalo", "Basar", "Koloriang", "Doimukh", "Bhalukpong", "Dirang", "Mechuka", "Tuting", "Sagalee", "Pangin", "Hawai", "Longding", "Deomali", "Bordumsa"],
        "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "North Lakhimpur", "Dhubri", "Sivasagar", "Karimganj", "Goalpara", "Dhemaji", "Nalbari", "Barpeta", "Mangaldoi", "Golaghat", "Hojai", "Morigaon", "Kokrajhar", "Mankachar", "Margherita", "Haflong", "Lumding", "Rangia", "Biswanath Chariali", "Sarupathar", "Mariani", "Maibong", "Digboi", "Namrup", "Sonari", "Naharkatiya", "Tihu", "Dergaon", "Silapathar", "Bilasipara", "Bokajan", "Howli", "Gauripur", "Samaguri", "Sarthebari", "Gohpur", "Jamugurihat", "Barpathar", "Majuli", "Bijni", "Chapar"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj", "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Lakhisarai", "Araria", "Madhubani", "Bettiah", "Samastipur", "Madhepura", "Bhabua", "Supaul", "Gopalganj", "Barh", "Mohania", "Mokama", "Forbesganj", "Narkatiaganj", "Sheikhpura", "Jamui", "Khagaria", "Raxaul", "Revelganj", "Rosera", "Sherghati", "Jogbani", "Naugachhia"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari", "Chirmiri", "Mahasamund", "Dalli-Rajhara", "Kawardha", "Bhatapara", "Kanker", "Naila Janjgir", "Tilda Newra", "Kondagaon", "Dongargarh", "Bemetara", "Champa", "Pakhanjur", "Mungeli", "Bhilai Charoda", "Patan", "Bijapur", "Bilha", "Khairagarh", "Baikunthpur", "Baloda Bazar", "Gariaband", "Sakti", "Akaltara", "Surajpur", "Ratanpur", "Balod", "Takhatpur", "Kusmi", "Bagbahara", "Manendragarh", "Simga", "Pathalgaon", "Saraipali", "Koria", "Basna", "Sukma", "Jashpur", "Pandaria", "Gandai"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Valpoi", "Pernem", "Quepem", "Canacona", "Sanguem", "Mormugao", "Aldona", "Cortalim", "Marcela", "Calangute", "Candolim", "Benaulim", "Varca", "Majorda", "Anjuna", "Arambol", "Mandrem", "Morjim", "Colva", "Cavelossim", "Baga"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Gandhidham", "Anand", "Navsari", "Morbi", "Surendranagar", "Bharuch", "Vapi", "Bhuj", "Godhra", "Patan", "Dahod", "Porbandar", "Palanpur", "Valsad", "Botad", "Amreli", "Deesa", "Jetpur", "Veraval", "Wadhwan", "Ankleshwar", "Kadi", "Visnagar", "Mahesana", "Himmatnagar", "Viramgam", "Keshod", "Modasa", "Palitana", "Petlad", "Kapadvanj", "Sidhpur", "Wankaner", "Vyara", "Padra", "Lunawada", "Rajpipla", "Dhoraji", "Khambhat", "Mahuva", "Una"],
        "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal", "Hansi", "Narnaul", "Fatehabad", "Gohana", "Tohana", "Narwana", "Charkhi Dadri", "Shahbad", "Kosli", "Mahendragarh", "Pehowa", "Samalkha", "Pinjore", "Ladwa", "Sohna", "Safidon", "Taraori", "Gharaunda", "Assandh", "Ratia", "Rania", "Siwani", "Julana", "Hodal", "Kalanaur", "Nuh", "Beri", "Naraingarh", "Ellenabad", "Tosham", "Meham", "Kanina"],
        "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Nahan", "Bilaspur", "Hamirpur", "Dharamshala", "Kullu", "Una", "Palampur", "Chamba", "Kangra", "Nurpur", "Jogindernagar", "Rampur", "Nalagarh", "Sujanpur", "Sundernagar", "Arki", "Parwanoo", "Manali", "Tira Sujanpur", "Santokhgarh", "Rohru", "Paonta Sahib", "Narkanda", "Kasauli", "Theog", "Nadaun", "Sarkaghat", "Rajgarh", "Daulatpur", "Chowari", "Jawali", "Dehra", "Nagrota Bagwan", "Bhuntar", "Jubbal", "Jwalamukhi", "Indora", "Bakloh", "Kotkhai", "Banjar", "Bhota", "Naina Devi", "Gagret", "Chuari Khas", "Dalhousie", "Talai", "Karsog"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Dumka", "Phusro", "Chirkunda", "Medininagar", "Chaibasa", "Chatra", "Gumla", "Pakur", "Mihijam", "Chass", "Lohardaga", "Garhwa", "Madhupur", "Jhumri Tilaiya", "Sahibganj", "Godda", "Bundu", "Simdega", "Khunti", "Chakradharpur", "Saraikela", "Hussainabad", "Rajmahal", "Jamtara", "Chandil", "Basukinath", "Mango", "Tenu Dam-cum-Kathhara", "Bhawanathpur", "Latehar", "Kodarma", "Chandrapura", "Ghatshila", "Jugsalai", "Jasidih", "Saunda", "Gomoh", "Chas", "Barughutu", "Kiriburu", "Barkakana", "Patratu"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Hassan", "Gadag-Betigeri", "Udupi", "Robertson Pet", "Bhadravati", "Chitradurga", "Kolar", "Mandya", "Chikmagalur", "Gangavati", "Bagalkot", "Ranebennuru", "Ramanagaram", "Harihar", "Karwar", "Sindhnur", "Chamrajnagar", "Yadgir", "Rabkavi Banhatti", "Gokak", "Tiptur", "Sirsi", "Haveri", "Madikeri", "Puttur", "Chintamani", "Sagar", "Shahabad", "Dandeli", "Mudhol", "Athni", "Mulbagal", "Surapura", "Hosapete", "Koppal", "Sira"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Manjeri", "Thalassery", "Ponnani", "Vatakara", "Kanhangad", "Taliparamba", "Koyilandy", "Neyyattinkara", "Kayamkulam", "Nedumangad", "Kannur Cantonment", "Ottappalam", "Tirur", "Feroke", "Kunnamkulam", "Kasaragod", "Nileshwaram", "Shornur", "Payyanur", "Mattannur", "Mananthavady", "Punalur", "Nilambur", "Cherthala", "Perinthalmanna", "Chalakudy", "Kodungallur", "Chittur-Thathamangalam", "Muvattupuzha", "Adoor", "Mavelikkara", "Mavoor", "Perumbavoor", "Varkala", "Kalamassery", "Paravur", "Pathanamthitta", "Peringathur", "Attingal", "Pandalam"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara (Katni)", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda", "Dhar", "Sarni", "Shahdol", "Jaora", "Mhow Cantonment", "Barwani", "Balaghat", "Shajapur", "Sheopur", "Morena", "Sendhwa", "Sidhi", "Sabalgarh", "Harda", "Bina Etawa", "Shujalpur", "Panna", "Narsinghpur"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded", "Akola", "Jalgaon", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambarnath", "Bhiwandi", "Navi Mumbai", "Panvel", "Satara", "Beed", "Yavatmal", "Achalpur", "Osmanabad", "Nandurbar", "Wardha", "Udgir", "Hinganghat", "Parli", "Sangamner", "Amalner", "Gondia", "Buldhana", "Ambejogai", "Deolali", "Kalyan-Dombivli", "Ulhasnagar", "Vasai-Virar", "Mira-Bhayandar", "Bhusawal", "Malegaon", "Pimpri-Chinchwad"],
        "Manipur": ["Imphal", "Thoubal", "Kakching", "Ukhrul", "Chandel", "Bishnupur", "Senapati", "Churachandpur", "Jiribam", "Moreh", "Lilong", "Mayang Imphal", "Nambol", "Yairipok", "Sugnu", "Moirang", "Wangjing", "Kumbi", "Ningthoukhong", "Oinam", "Kangpokpi", "Nungba", "Samurou", "Wangoi", "Sekmai Bazar", "Lamlai", "Kwakta", "Sikhong Sekmai", "Saitu Gamphazol", "Andro"],
        "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Resubelpara", "Baghmara", "Nongpoh", "Mairang", "Khliehriat", "Mawlai", "Madanriting", "Nongthymmai", "Pynthorumkhrah", "Cherrapunji", "Lawsohtun", "Mawpat", "Nongmynsong", "Umroi", "Byrnihat", "Laitumkhrah", "Nongkseh", "Mawsynram", "Nongkrem", "Mawngap", "Mawphlang", "Sohiong", "Nongspung", "Mawkyrwat", "Pynursla"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saitual", "Khawzawl", "Hnahthial", "Mamit", "Saiha", "Zawlnuam", "Bairabi", "Darlawn", "Khawhai", "Lengpui", "N. Kawnpui", "Thenzawl", "Tlabung", "Vairengte", "Biate", "Diltlang", "Kawrthah", "Keifang", "Khawruhlian", "North Vanlaiphai", "Phullen", "Serchhip", "Thingsulthliah", "Zobawk"],
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Peren", "Phek", "Kiphire", "Longleng", "Noklak", "Chumukedima", "Tseminyu", "Changtongya", "Tuli", "Pfutsero", "Jalukie", "Aboi", "Mangkolemba", "Medziphema", "Shamator", "Longkhim", "Aghunato", "Tening", "Meluri", "Tobu", "Chozuba", "Longmatra", "Akuluto"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Bargarh", "Rayagada", "Bhawanipatna", "Dhenkanal", "Balangir", "Paradip", "Jajpur", "Angul", "Kendujhar", "Boudh", "Kendrapara", "Sunabeda", "Koraput", "Phulbani", "Nabarangpur", "Malkangiri", "Sonepur", "Talcher", "Nayagarh", "Jagatsinghpur", "Nuapada", "Brahmapur", "Deogarh", "Kamakhyanagar", "Kantabanji", "Bhanjanagar", "Byasanagar", "Rajgangpur", "Soro", "Udala", "Karanjia", "Nilagiri", "Tusura", "Papadahandi", "Ganjam", "Rairangpur", "Banki", "Kuchinda", "Patnagarh"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Faridkot", "Sangrur", "Fazilka", "Gurdaspur", "Kharar", "Gobindgarh", "Mansa", "Malout", "Nawanshahr", "Rupnagar", "Jagraon", "Sunam", "Dhuri", "Dinanagar", "Zira", "Patti", "Samana", "Tarn Taran", "Nangal", "Nakodar", "Kotkapura", "Abohar", "Morinda", "Longowal", "Nabha", "Raikot", "Sahnewal", "Mukerian", "Talwandi Sabo", "Phillaur", "Giddarbaha", "Qadian"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar", "Pali", "Bharatpur", "Kishangarh", "Beawar", "Hanumangarh", "Dhaulpur", "Gangapur City", "Sawai Madhopur", "Churu", "Jhunjhunu", "Banswara", "Nagaur", "Hindaun", "Bundi", "Sujangarh", "Tonk", "Baran", "Chittorgarh", "Makrana", "Nokha", "Dausa", "Fatehpur", "Rajsamand", "Ladnu", "Ratangarh", "Sheoganj", "Sardarshahar", "Nimbahera", "Sirohi", "Pratapgarh", "Rawatbhata", "Jobner", "Bissau", "Nawalgarh", "Rajgarh", "Nasirabad", "Nohar", "Phalodi", "Nathdwara", "Pilani"],
        "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Nayabazar", "Ravangla", "Chungthang", "Soreng", "Yuksom", "Lachung", "Pelling", "Rinchenpong", "Rhenock", "Rongli", "Pakyong", "Melli", "Legship", "Dikchu", "Dentam", "Lachen", "Temi", "Yangang", "Namthang", "Rongphu", "Majitar", "Makha", "Phensang"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kancheepuram", "Kumarapalayam", "Karaikkudi", "Neyveli", "Cuddalore", "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Gudiyatham", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam", "Viluppuram", "Tiruchengode", "Vadipatti", "Namagiripettai", "Virudhunagar", "Srivilliputtur", "Tindivanam", "Virudhachalam", "Arakkonam", "Sathyamangalam", "Palani", "Mettupalayam", "Arani", "Perambalur", "Usilampatti", "Vedaranyam", "Sathyamangalam", "Puliyankudi"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", "Mancherial", "Bhongir", "Siddipet", "Kothagudem", "Bodhan", "Palwancha", "Mandamarri", "Koratla", "Sircilla", "Tandur", "Sangareddy", "Vikarabad", "Bellampalle", "Gadwal", "Kamareddy", "Wanaparthy", "Farooqnagar", "Yellandu", "Kyathampalle", "Nagarkurnool", "Narayanpet", "Sadasivpet", "Yellandu", "Manuguru", "Kyathampalle", "Nagarkurnool", "Narayanpet", "Sadasivpet", "Husnabad", "Huzurabad", "Bhadrachalam", "Armoor", "Jangaon", "Kollapur", "Medak", "Narayankhed", "Nirmal"],
        "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Sabroom", "Amarpur", "Sonamura", "Bishalgarh", "Melaghar", "Mohanpur", "Ranirbazar", "Jogendranagar", "Kamalpur", "Pratapgarh", "Kumarghat", "Panisagar", "Santirbazar", "Manu", "Jirania", "Jampuijala", "Mandai", "Boxanagar", "Kanchanpur", "Gandacherra", "Chailengta", "Salema"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Loni", "Jhansi", "Muzaffarnagar", "Mathura", "Shahjahanpur", "Rampur", "Farrukhabad", "Ayodhya", "Maunath Bhanjan", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Mughalsarai", "Barabanki", "Khurja", "Gonda", "Mainpuri", "Lalitpur", "Etah", "Deoria"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Kotdwar", "Nainital", "Mussoorie", "Srinagar", "Jaspur", "Sitarganj", "Manglaur", "Bageshwar", "Tehri", "Pauri", "Almora", "Chamoli Gopeshwar", "Uttarkashi", "Bhimtal", "Kichha", "Nagla", "Laksar", "Herbertpur", "Vikasnagar", "Bazpur", "Khatima", "Dineshpur", "Gadarpur", "Bhowali", "Lohaghat", "Tanakpur", "Jhabrera", "Barkot", "Champawat", "Dwarahat", "Shaktigarh", "Didihat", "Karnaprayag", "Kedarnath", "Gangotri", "Chamba", "Landhaura", "Mahua Dabra Haripura", "Ranikhet", "Joshimath", "Rudraprayag"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Jangipur", "Bangaon", "Cooch Behar", "Bolpur", "Kanthi", "Memari", "Katwa", "Nalhati", "Tamluk", "Balurghat", "Kalna", "Contai", "Gangarampur", "Ghatal", "Jhargram", "Arambagh", "Chandannagar", "Srirampore", "Jamuria", "Bongaon", "Champdani", "Baidyabati", "Kulti"]
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
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
            base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            console.log('Base64 String:', base64String);
            // You can now use the base64String for further processing
            };
            reader.readAsDataURL(file);
        }
    });

    // Update range slider values
    electricityRange.addEventListener('input', function() {
        electricityValue.textContent = this.value + ' hours';
    });

    waterRange.addEventListener('input', function() {
        waterValue.textContent = this.value + ' hours';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Perform final validation
        if (form.checkValidity()) {
            // If the form is valid, you can submit it or process the data
            console.log('Form submitted successfully!');
            // You can add your own logic here to send the form data to a server
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.photo = base64String;
            console.log(data);
            handleFormSubmit({data});
        } else {
            // If the form is invalid, show validation messages
            // form.reportValidity();
        }
    });

    const handleFormSubmit = ({data}) => {
        fetch(
            "https://paryatansetu.onrender.com/roomform"
            // "http://192.168.31.252:5001/roomform"
             , {
            mode: "cors",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
    };
});

