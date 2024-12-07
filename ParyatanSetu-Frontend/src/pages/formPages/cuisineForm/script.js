document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('serviceProviderForm');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const pincodeInput = document.getElementById('pincode');
    const photoInput = document.getElementById('photo');
    const specializationSelect = document.getElementById('specialization');
    const foodTypeRadios = document.getElementsByName('foodType');
    const foodItemsContainer = document.getElementById('foodItems');
    const electricityRange = document.getElementById('electricityAvailability');
    const waterRange = document.getElementById('waterAvailability');
    const electricityValue = document.getElementById('electricityValue');
    const waterValue = document.getElementById('waterValue');
    let base64String = '';
    let foodItemsList = [];
    let Featues = [];
    // Updated Indian states and cities data
    const indianStatesAndCities = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur", "Bhimavaram", "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Srikakulam", "Narasaraopet", "Tadipatri", "Tadepalligudem", "Chilakaluripet", "Yemmiganur", "Kadiri", "Chirala", "Anakapalle", "Kavali", "Palacole", "Sullurpeta", "Tanuku", "Gudur", "Mandapeta", "Macherla", "Bapatla", "Nagari", "Rayachoti", "Pithapuram", "Punganur", "Nidadavole", "Pileru", "Rajampet", "Kandukur", "Repalle"],
        "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Tezu", "Bomdila", "Ziro", "Tawang", "Along", "Roing", "Anini", "Daporijo", "Yingkiong", "Seppa", "Khonsa", "Changlang", "Aalo", "Basar", "Koloriang", "Doimukh", "Bhalukpong", "Dirang", "Mechuka", "Tuting", "Sagalee", "Pangin", "Hawai", "Longding", "Deomali", "Bordumsa", "Hayuliang", "Palin", "Mengio", "Tali", "Tato", "Chambang", "Chayang Tajo", "Bameng", "Lemmi", "Thrizino", "Vijoynagar", "Dollungmukh", "Jamiri", "Ganga", "Gyawepurang", "Gensi", "Singa", "Dambuk", "Mariyang", "Miao", "Nampong"],
        "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "North Lakhimpur", "Dhubri", "Sivasagar", "Karimganj", "Goalpara", "Dhemaji", "Nalbari", "Barpeta", "Mangaldoi", "Golaghat", "Hojai", "Morigaon", "Kokrajhar", "Mankachar", "Margherita", "Haflong", "Lumding", "Rangia", "Biswanath Chariali", "Sarupathar", "Mariani", "Maibong", "Digboi", "Namrup", "Sonari", "Naharkatiya", "Tihu", "Dergaon", "Silapathar", "Bilasipara", "Bokajan", "Howli", "Gauripur", "Samaguri", "Sarthebari", "Gohpur", "Jamugurihat", "Barpathar", "Majuli", "Bijni", "Chapar", "Doom Dooma", "Badarpur", "Kharupetia", "Hamren", "Bihpuria"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj", "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Lakhisarai", "Araria", "Madhubani", "Bettiah", "Samastipur", "Madhepura", "Bhabua", "Supaul", "Gopalganj", "Barh", "Mohania", "Mokama", "Forbesganj", "Narkatiaganj", "Sheikhpura", "Jamui", "Khagaria", "Raxaul", "Revelganj", "Rosera", "Sherghati", "Jogbani", "Naugachhia", "Banka", "Warisaliganj", "Fatwah", "Hilsa", "Nokha"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari", "Chirmiri", "Mahasamund", "Dalli-Rajhara", "Kawardha", "Bhatapara", "Kanker", "Naila Janjgir", "Tilda Newra", "Kondagaon", "Dongargarh", "Bemetara", "Champa", "Pakhanjur", "Mungeli", "Bhilai Charoda", "Patan", "Bijapur", "Bilha", "Khairagarh", "Baikunthpur", "Baloda Bazar", "Gariaband", "Sakti", "Akaltara", "Surajpur", "Ratanpur", "Balod", "Takhatpur", "Kusmi", "Bagbahara", "Manendragarh", "Simga", "Pathalgaon", "Saraipali", "Koria", "Basna", "Sukma", "Jashpur", "Pandaria", "Gandai", "Kharod", "Lormi", "Bhanupratappur", "Kasdol", "Nandini"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Valpoi", "Pernem", "Quepem", "Canacona", "Sanguem", "Mormugao", "Aldona", "Cortalim", "Marcela", "Calangute", "Candolim", "Benaulim", "Varca", "Majorda", "Anjuna", "Arambol", "Mandrem", "Morjim", "Colva", "Cavelossim", "Baga", "Porvorim", "Siolim", "Cansaulim", "Dona Paula", "Loutolim", "Moira", "Navelim", "Reis Magos", "Saligao", "Sao Jose de Areal", "Shiroda", "Taleigao", "Vagator", "Velim", "Betim", "Carambolim", "Chicalim", "Colvale", "Corlim", "Davorlim"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Gandhidham", "Anand", "Navsari", "Morbi", "Surendranagar", "Bharuch", "Vapi", "Bhuj", "Godhra", "Patan", "Dahod", "Porbandar", "Palanpur", "Valsad", "Botad", "Amreli", "Deesa", "Jetpur", "Veraval", "Wadhwan", "Ankleshwar", "Kadi", "Visnagar", "Mahesana", "Himmatnagar", "Viramgam", "Keshod", "Modasa", "Palitana", "Petlad", "Kapadvanj", "Sidhpur", "Wankaner", "Vyara", "Padra", "Lunawada", "Rajpipla", "Dhoraji", "Khambhat", "Mahuva", "Una", "Dholka", "Halol", "Kalol", "Mandvi", "Thangadh"],
        "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal", "Hansi", "Narnaul", "Fatehabad", "Gohana", "Tohana", "Narwana", "Charkhi Dadri", "Shahbad", "Kosli", "Mahendragarh", "Pehowa", "Samalkha", "Pinjore", "Ladwa", "Sohna", "Safidon", "Taraori", "Gharaunda", "Assandh", "Ratia", "Rania", "Siwani", "Julana", "Hodal", "Kalanaur", "Nuh", "Beri", "Naraingarh", "Ellenabad", "Tosham", "Meham", "Kanina", "Indri", "Bhuna", "Cheeka", "Ganaur", "Hassanpur"],
        "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Nahan", "Bilaspur", "Hamirpur", "Dharamshala", "Kullu", "Una", "Palampur", "Chamba", "Kangra", "Nurpur", "Jogindernagar", "Rampur", "Nalagarh", "Sujanpur", "Sundernagar", "Arki", "Parwanoo", "Manali", "Tira Sujanpur", "Santokhgarh", "Rohru", "Paonta Sahib", "Narkanda", "Kasauli", "Theog", "Nadaun", "Sarkaghat", "Rajgarh", "Daulatpur", "Chowari", "Jawali", "Dehra", "Nagrota Bagwan", "Bhuntar", "Jubbal", "Jwalamukhi", "Indora", "Bakloh", "Kotkhai", "Banjar", "Bhota", "Naina Devi", "Gagret", "Chuari Khas", "Dalhousie", "Talai", "Karsog", "Suni", "Kandaghat", "Baijnath", "Jawalamukhi", "Jogindernagar"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Dumka", "Phusro", "Chirkunda", "Medininagar", "Chaibasa", "Chatra", "Gumla", "Pakur", "Mihijam", "Chass", "Lohardaga", "Garhwa", "Madhupur", "Jhumri Tilaiya", "Sahibganj", "Godda", "Bundu", "Simdega", "Khunti", "Chakradharpur", "Saraikela", "Hussainabad", "Rajmahal", "Jamtara", "Chandil", "Basukinath", "Mango", "Tenu Dam-cum-Kathhara", "Bhawanathpur", "Latehar", "Kodarma", "Chandrapura", "Ghatshila", "Jugsalai", "Jasidih", "Saunda", "Gomoh", "Chas", "Barughutu", "Kiriburu", "Barkakana", "Patratu", "Barhi", "Nirsa", "Domchanch", "Gobindpur", "Sijua"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Hassan", "Gadag-Betigeri", "Udupi", "Robertson Pet", "Bhadravati", "Chitradurga", "Kolar", "Mandya", "Chikmagalur", "Gangavati", "Bagalkot", "Ranebennuru", "Ramanagaram", "Harihar", "Karwar", "Sindhnur", "Chamrajnagar", "Yadgir", "Rabkavi Banhatti", "Gokak", "Tiptur", "Sirsi", "Haveri", "Madikeri", "Puttur", "Chintamani", "Sagar", "Shahabad", "Dandeli", "Mudhol", "Athni", "Mulbagal", "Surapura", "Hosapete", "Koppal", "Sira", "Kampli", "Channagiri", "Bhalki", "Nanjangud", "Chikkaballapur"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Manjeri", "Thalassery", "Ponnani", "Vatakara", "Kanhangad", "Taliparamba", "Koyilandy", "Neyyattinkara", "Kayamkulam", "Nedumangad", "Kannur Cantonment", "Ottappalam", "Tirur", "Feroke", "Kunnamkulam", "Kasaragod", "Nileshwaram", "Shornur", "Payyanur", "Mattannur", "Mananthavady", "Punalur", "Nilambur", "Cherthala", "Perinthalmanna", "Chalakudy", "Kodungallur", "Chittur-Thathamangalam", "Muvattupuzha", "Adoor", "Mavelikkara", "Mavoor", "Perumbavoor", "Varkala", "Kalamassery", "Paravur", "Pathanamthitta", "Peringathur", "Attingal", "Pandalam", "Thodupuzha", "Kothamangalam", "Irinjalakuda", "Pala", "Changanassery"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara (Katni)", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda", "Dhar", "Sarni", "Shahdol", "Jaora", "Mhow Cantonment", "Barwani", "Balaghat", "Shajapur", "Sheopur", "Morena", "Sendhwa", "Sidhi", "Sabalgarh", "Harda", "Bina Etawa", "Shujalpur", "Panna", "Narsinghpur", "Gadarwara", "Dabra", "Mandideep", "Sironj", "Manawar"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded", "Akola", "Jalgaon", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambarnath", "Bhiwandi", "Navi Mumbai", "Panvel", "Satara", "Beed", "Yavatmal", "Achalpur", "Osmanabad", "Nandurbar", "Wardha", "Udgir", "Hinganghat", "Parli", "Sangamner", "Amalner", "Gondia", "Buldhana", "Ambejogai", "Deolali", "Kalyan-Dombivli", "Ulhasnagar", "Vasai-Virar", "Mira-Bhayandar", "Bhusawal", "Malegaon", "Pimpri-Chinchwad", "Kolhapur", "Nanded", "Sangli", "Baramati", "Palghar", "Lonavla", "Shrirampur", "Washim", "Hingoli"],
        "Manipur": ["Imphal", "Thoubal", "Kakching", "Ukhrul", "Chandel", "Bishnupur", "Senapati", "Churachandpur", "Jiribam", "Moreh", "Lilong", "Mayang Imphal", "Nambol", "Yairipok", "Sugnu", "Moirang", "Wangjing", "Kumbi", "Ningthoukhong", "Oinam", "Kangpokpi", "Nungba", "Samurou", "Wangoi", "Sekmai Bazar", "Lamlai", "Kwakta", "Sikhong Sekmai", "Saitu Gamphazol", "Andro", "Pherzawl", "Noney", "Tamenglong", "Tengnoupal", "Kamjong", "Nungba", "Saikul", "Lamsang", "Singhat", "Moirang Lamkhai", "Tera", "Khongman", "Sagolmang", "Heirok", "Khongjom", "Nongpok Sekmai", "Phungyar", "Kasom Khullen", "Mao", "Saikot"],
        "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Resubelpara", "Baghmara", "Nongpoh", "Mairang", "Khliehriat", "Mawlai", "Madanriting", "Nongthymmai", "Pynthorumkhrah", "Cherrapunji", "Lawsohtun", "Mawpat", "Nongmynsong", "Umroi", "Byrnihat", "Laitumkhrah", "Nongkseh", "Mawsynram", "Nongkrem", "Mawngap", "Mawphlang", "Sohiong", "Nongspung", "Mawkyrwat", "Pynursla", "Ranikor", "Laskein", "Kharkutta", "Mendipathar", "Ampati", "Mahendraganj", "Dadengiri", "Garobadha", "Dalu", "Phulbari", "Tikrikilla", "Selsella", "Dadenggre", "Rongjeng", "Songsak", "Samanda", "Khliehriat", "Amlarem", "Mawkynrew", "Mawshynrut"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saitual", "Khawzawl", "Hnahthial", "Mamit", "Saiha", "Zawlnuam", "Bairabi", "Darlawn", "Khawhai", "Lengpui", "N. Kawnpui", "Thenzawl", "Tlabung", "Vairengte", "Biate", "Diltlang", "Kawrthah", "Keifang", "Khawruhlian", "North Vanlaiphai", "Phullen", "Serchhip", "Thingsulthliah", "Zobawk", "Bunghmun", "Chawngte", "Darlung", "Haulawng", "Hnahthial", "Khawhai", "Khawzawl", "Lawngtlai", "Lengpui", "Lunglei", "Mamit", "Ngopa", "Reiek", "Saiha", "Saitual", "Serchhip", "Thenzawl", "Tlabung", "Vairengte", "Zawlnuam"],
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Peren", "Phek", "Kiphire", "Longleng", "Noklak", "Chumukedima", "Tseminyu", "Changtongya", "Tuli", "Pfutsero", "Jalukie", "Aboi", "Mangkolemba", "Medziphema", "Shamator", "Longkhim", "Aghunato", "Tening", "Meluri", "Tobu", "Chozuba", "Longmatra", "Akuluto", "Tizit", "Naginimora", "Pughoboto", "Athibung", "Chuchuyimlang", "Bhandari", "Longchem", "Mopungchuket", "Tsurang", "Chare", "Longkhim", "Mokokchung", "Noklak", "Peren", "Phek", "Pungro", "Satakha", "Suruhuto", "Tamlu", "Tening"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Bargarh", "Rayagada", "Bhawanipatna", "Dhenkanal", "Balangir", "Paradip", "Jajpur", "Angul", "Kendujhar", "Boudh", "Kendrapara", "Sunabeda", "Koraput", "Phulbani", "Nabarangpur", "Malkangiri", "Sonepur", "Talcher", "Nayagarh", "Jagatsinghpur", "Nuapada", "Brahmapur", "Deogarh", "Kamakhyanagar", "Kantabanji", "Bhanjanagar", "Byasanagar", "Rajgangpur", "Soro", "Udala", "Karanjia", "Nilagiri", "Tusura", "Papadahandi", "Ganjam", "Rairangpur", "Banki", "Kuchinda", "Patnagarh", "Attabira", "Binka", "Champua", "Dunguripali", "Gudari"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Faridkot", "Sangrur", "Fazilka", "Gurdaspur", "Kharar", "Gobindgarh", "Mansa", "Malout", "Nawanshahr", "Rupnagar", "Jagraon", "Sunam", "Dhuri", "Dinanagar", "Zira", "Patti", "Samana", "Tarn Taran", "Nangal", "Nakodar", "Kotkapura", "Abohar", "Morinda", "Longowal", "Nabha", "Raikot", "Sahnewal", "Mukerian", "Talwandi Sabo", "Phillaur", "Giddarbaha", "Qadian", "Anandpur Sahib", "Baghapurana", "Bhikhi", "Bhogpur", "Budhlada"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar", "Pali", "Bharatpur", "Kishangarh", "Beawar", "Hanumangarh", "Dhaulpur", "Gangapur City", "Sawai Madhopur", "Churu", "Jhunjhunu", "Banswara", "Nagaur", "Hindaun", "Bundi", "Sujangarh", "Tonk", "Baran", "Chittorgarh", "Makrana", "Nokha", "Dausa", "Fatehpur", "Rajsamand", "Ladnu", "Ratangarh", "Sheoganj", "Sardarshahar", "Nimbahera", "Sirohi", "Pratapgarh", "Rawatbhata", "Jobner", "Bissau", "Nawalgarh", "Rajgarh", "Nasirabad", "Nohar", "Phalodi", "Nathdwara", "Pilani", "Merta City", "Sojat", "Neem-Ka-Thana", "Udaipurwati", "Losal"],
        "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Nayabazar", "Ravangla", "Chungthang", "Soreng", "Yuksom", "Lachung", "Pelling", "Rinchenpong", "Rhenock", "Rongli", "Pakyong", "Melli", "Legship", "Dikchu", "Dentam", "Lachen", "Temi", "Yangang", "Namthang", "Rongphu", "Majitar", "Makha", "Phensang", "Lachung", "Lachen", "Phodong", "Kabi", "Dzongu", "Lingdok", "Martam", "Ranka", "Sang", "Samdong", "Sombaria", "Tashiding", "Tolung", "Wok", "Yumthang", "Zemu", "Gor", "Hee", "Kewzing", "Lachen"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kancheepuram", "Kumarapalayam", "Karaikkudi", "Neyveli", "Cuddalore", "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Gudiyatham", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam", "Viluppuram", "Tiruchengode", "Vadipatti", "Namagiripettai", "Virudhunagar", "Srivilliputtur", "Tindivanam", "Virudhachalam", "Arakkonam", "Sathyamangalam", "Palani", "Mettupalayam", "Arani", "Perambalur", "Usilampatti", "Vedaranyam", "Sathyamangalam", "Puliyankudi", "Aruppukkottai", "Paramakudi", "Avinashi", "Tiruttani", "Kovilpatti"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", "Mancherial", "Bhongir", "Siddipet", "Kothagudem", "Bodhan", "Palwancha", "Mandamarri", "Koratla", "Sircilla", "Tandur", "Sangareddy", "Vikarabad", "Bellampalle", "Gadwal", "Kamareddy", "Wanaparthy", "Farooqnagar", "Yellandu", "Kyathampalle", "Nagarkurnool", "Narayanpet", "Sadasivpet", "Husnabad", "Huzurabad", "Bhadrachalam", "Armoor", "Jangaon", "Kollapur", "Medak", "Narayankhed", "Nirmal", "Kodad", "Pargi", "Shadnagar", "Chevella", "Mahabubabad", "Manthani", "Peddapalli", "Zaheerabad", "Bhainsa", "Devarakonda", "Gajwel", "Jammikunta"],
        "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Sabroom", "Amarpur", "Sonamura", "Bishalgarh", "Melaghar", "Mohanpur", "Ranirbazar", "Jogendranagar", "Kamalpur", "Pratapgarh", "Kumarghat", "Panisagar", "Santirbazar", "Manu", "Jirania", "Jampuijala", "Mandai", "Boxanagar", "Kanchanpur", "Gandacherra", "Chailengta", "Salema", "Baxanagar", "Camperbazar", "Champaknagar", "Dukli", "Fatikroy", "Hrishyamukh", "Kadamtala", "Kalyanpur", "Kathalia", "Killa", "Matarbari", "Matabari", "Nalchar", "Old Agartala", "Radhakishorenagar", "Rajnagar", "Rupaichari", "Sidhai", "Takarjala", "Tulashikhar"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Loni", "Jhansi", "Muzaffarnagar", "Mathura", "Shahjahanpur", "Rampur", "Farrukhabad", "Ayodhya", "Maunath Bhanjan", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Mughalsarai", "Barabanki", "Khurja", "Gonda", "Mainpuri", "Lalitpur", "Etah", "Deoria", "Ujhani", "Ghazipur", "Sultanpur", "Azamgarh", "Bijnor"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Kotdwar", "Nainital", "Mussoorie", "Srinagar", "Jaspur", "Sitarganj", "Manglaur", "Bageshwar", "Tehri", "Pauri", "Almora", "Chamoli Gopeshwar", "Uttarkashi", "Bhimtal", "Kichha", "Nagla", "Laksar", "Herbertpur", "Vikasnagar", "Bazpur", "Khatima", "Dineshpur", "Gadarpur", "Bhowali", "Lohaghat", "Tanakpur", "Jhabrera", "Barkot", "Champawat", "Dwarahat", "Shaktigarh", "Didihat", "Karnaprayag", "Kedarnath", "Gangotri", "Chamba", "Landhaura", "Mahua Dabra Haripura", "Ranikhet", "Joshimath", "Rudraprayag", "Devprayag", "Gauchar", "Karnprayag", "Munsiari", "Nandprayag"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Jangipur", "Bangaon", "Cooch Behar", "Bolpur", "Kanthi", "Memari", "Katwa", "Nalhati", "Tamluk", "Balurghat", "Kalna", "Contai", "Gangarampur", "Ghatal", "Jhargram", "Arambagh", "Chandannagar", "Srirampore", "Jamuria", "Bongaon", "Champdani", "Baidyabati", "Kulti", "Kalyani", "Berhampore", "Barrackpore", "Bhatpara", "Barasat"]
    };

    // Food items data
    const foodItems = {
        northIndian: {
            veg: [
                "Paneer Tikka", "Aloo Gobi", "Palak Paneer", "Chole Bhature", "Dal Makhani", "Vegetable Biryani", 
                "Malai Kofta", "Matar Paneer", "Baingan Bharta", "Vegetable Jalfrezi", "Aloo Paratha", 
                "Vegetable Korma", "Rajma", "Kadai Paneer", "Vegetable Pulao", "Chana Masala", "Mushroom Masala", 
                "Paneer Butter Masala", "Vegetable Samosa", "Aloo Matar", "Vegetable Pakora", "Paneer Bhurji", 
                "Vegetable Handi", "Jeera Aloo", "Vegetable Kofta", "Paneer Lababdar", "Aloo Tikki", "Vegetable Kurma", 
                "Paneer Makhani", "Vegetable Manchurian", "Vegetable Kolhapuri", "Paneer Do Pyaza"
            ],
            nonVeg: [
                "Butter Chicken", "Tandoori Chicken", "Chicken Tikka Masala", "Rogan Josh", "Chicken Biryani", 
                "Mutton Korma", "Fish Amritsari", "Keema Matar", "Chicken Chettinad", "Lamb Vindaloo", 
                "Chicken Curry", "Mutton Biryani", "Chicken Kadai", "Fish Curry", "Chicken Malai Tikka", 
                "Mutton Do Pyaza", "Chicken Seekh Kebab", "Prawn Masala", "Chicken Handi", "Mutton Kofta", 
                "Chicken Lababdar", "Fish Tikka", "Chicken Kolhapuri", "Mutton Keema", "Chicken Reshmi Kebab", 
                "Egg Curry", "Chicken Bhuna", "Mutton Rogan Josh", "Chicken Tangdi Kebab", "Fish Masala", 
                "Chicken Korma", "Mutton Curry"
            ]
        },
        southIndian: {
            veg: [
                "Masala Dosa", "Idli Sambar", "Vegetable Uttapam", "Ven Pongal", "Bisi Bele Bath", "Avial", 
                "Vegetable Kurma", "Tomato Bath", "Lemon Rice", "Coconut Rice", "Medu Vada", "Vegetable Upma", 
                "Rava Dosa", "Vegetable Poriyal", "Curd Rice", "Vegetable Puliyogare", "Mysore Pak", "Vegetable Pesarattu", 
                "Vegetable Thoran", "Vegetable Rasam", "Vegetable Kootu", "Vegetable Pachadi", "Vegetable Payasam", 
                "Vegetable Vada Curry", "Vegetable Olan", "Vegetable Stew", "Vegetable Appam", "Vegetable Adai", 
                "Vegetable Bonda", "Vegetable Sevai", "Vegetable Paniyaram", "Vegetable Kuzhambu"
            ],
            nonVeg: [
                "Chicken Chettinad", "Fish Moilee", "Andhra Fish Curry", "Chicken 65", "Malabar Fish Biryani", 
                "Mutton Sukka", "Prawn Masala", "Nellore Fish Pulusu", "Chicken Ghee Roast", "Kerala Fish Fry", 
                "Chicken Stew", "Mutton Pepper Fry", "Fish Pollichathu", "Chicken Varuval", "Prawn Curry", 
                "Mutton Biryani", "Fish Koliwada", "Chicken Roast", "Crab Masala", "Egg Roast", "Chicken Kebab", 
                "Fish Pulusu", "Mutton Chukka", "Prawn Fry", "Chicken Ularthiyathu", "Fish Curry", "Mutton Curry", 
                "Chicken Fry", "Squid Roast", "Egg Curry", "Chicken Curry", "Fish Fry"
            ]
        },
        chinese: {
            veg: [
                "Vegetable Fried Rice", "Vegetable Manchurian", "Vegetable Spring Rolls", "Vegetable Hakka Noodles", 
                "Vegetable Dumplings", "Kung Pao Tofu", "Vegetable Hot and Sour Soup", "Stir-Fried Vegetables in Garlic Sauce", 
                "Vegetable Chow Mein", "Vegetable Szechuan", "Vegetable Dim Sum", "Vegetable Lo Mein", "Vegetable Chop Suey", 
                "Vegetable Mapo Tofu", "Vegetable Wonton Soup", "Vegetable Dan Dan Noodles", "Vegetable Egg Foo Young", 
                "Vegetable Kung Pao", "Vegetable Schezwan Noodles", "Vegetable Crispy Honey Chilli Potato", 
                "Vegetable Buddha's Delight", "Vegetable Sichuan Eggplant", "Vegetable Scallion Pancakes", 
                "Vegetable Sesame Noodles", "Vegetable Bok Choy with Garlic", "Vegetable Ma Po Eggplant", 
                "Vegetable Chinese Bhel", "Vegetable Hunan Style", "Vegetable Schezwan Fried Rice", 
                "Vegetable Chinese Garlic Sauce", "Vegetable Salt and Pepper Tofu", "Vegetable Sichuan Green Beans"
            ],
            nonVeg: [
                "Kung Pao Chicken", "Sweet and Sour Pork", "Chilli Chicken", "Szechuan Beef", "Chicken Manchurian", 
                "Prawn Fried Rice", "Chicken Dumplings", "Fish in Black Bean Sauce", "Chicken Chow Mein", "Mongolian Beef", 
                "General Tso's Chicken", "Peking Duck", "Mapo Tofu with Pork", "Shrimp Lo Mein", "Orange Chicken", 
                "Beef and Broccoli", "Honey Walnut Shrimp", "Egg Foo Young", "Moo Goo Gai Pan", "Hunan Chicken", 
                "Salt and Pepper Squid", "Twice Cooked Pork", "Sichuan Spicy Boiled Fish", "Cantonese Roast Duck", 
                "Shrimp with Lobster Sauce", "Crispy Aromatic Duck", "Beef Chow Fun", "Dongpo Pork", "Char Siu", 
                "Sichuan Spicy Chicken", "Seafood Bird's Nest", "Crispy Chilli Beef"
            ]
        }
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

    // Handle specialization and food type selection
    function updateFoodItems() {
        const specialization = specializationSelect.value;
        const foodType = document.querySelector('input[name="foodType"]:checked')?.value;

        foodItemsContainer.style.display = specialization && foodType ? 'block' : 'none';

        if (specialization && foodType) {
            const items = foodItems[specialization][foodType];
            foodItemsContainer.innerHTML = items.map(item => `
                <label>
                    <input type="checkbox" name="foodItems" value="${item}">
                    ${item}
                </label>
            `).join('');
        }
    }

    specializationSelect.addEventListener('change', updateFoodItems);
    foodTypeRadios.forEach(radio => radio.addEventListener('change', updateFoodItems));

    // Handle amenities selection
    const amenitiesCheckboxes = document.querySelectorAll('input[name="amenities"]');
    amenitiesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedAmenities = Array.from(amenitiesCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            console.log('Selected Amenities:', selectedAmenities);
            Featues = selectedAmenities;
        });
    });

    foodItemsContainer.addEventListener('change', function() {
        const selectedFoodItems = Array.from(this.querySelectorAll('input[name="foodItems"]:checked'))
            .map(checkbox => checkbox.value);
        console.log('Selected Food Items:', selectedFoodItems);
        foodItemsList = selectedFoodItems;
    });
    

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate food items selection (at least 10)
        const selectedFoodItems = document.querySelectorAll('input[name="foodItems"]:checked');
        if (selectedFoodItems.length < 10) {
            alert('Please select at least 10 food items.');
            return;
        }

        // Perform final validation
        if (form.checkValidity()) {
            // If the form is valid, you can submit it or process the data
            console.log('Form submitted successfully!');
            // You can add your own logic here to send the form data to a server
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.photo = base64String;
            data.amenities = Featues;
            data.foodItems = foodItemsList;
            console.log('Data:', data);
            handleFormSubmit({data});
        } else {
            // If the form is invalid, show validation messages
            form.reportValidity();
        }
    });

    const handleFormSubmit = ({data}) => {
        fetch(
            "https://paryatansetu.onrender.com/foodform"
            // "http://192.168.31.252:5001/foodform"
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

