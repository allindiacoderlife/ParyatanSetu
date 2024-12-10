document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const currentAccountBtn = document.getElementById("current-account");
  const accountList = document.getElementById("account-list");
  const username = document.getElementById("username");
  const userType = document.getElementById("user-type");
  const serviceType = document.getElementById("service-type");

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Account switching
  currentAccountBtn.addEventListener("click", () => {
    accountList.classList.toggle("visible");
  });

  // Close account list when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !currentAccountBtn.contains(event.target) &&
      !accountList.contains(event.target)
    ) {
      accountList.classList.remove("visible");
    }
  });

  // Fetch user data and populate profile
  function fetchUserDatas() {
    // Simulated API call
    setTimeout(() => {
      const userData = {
        username: "John Doe",
        userType: "Visitor",
        serviceType: "",
        accounts: ["John Doe", "Jane Doe"],
        paymentHistory: [
          { date: "2023-05-01", amount: 100, description: "Hotel Booking" },
          { date: "2023-04-15", amount: 50, description: "Tour Package" },
        ],
        savedTrips: [
          { name: "Beach Getaway", date: "2023-06-15" },
          { name: "Mountain Adventure", date: "2023-07-20" },
        ],
        bookings: [
          { name: "Luxury Hotel", date: "2023-06-15", status: "Confirmed" },
          { name: "City Tour", date: "2023-06-16", status: "Pending" },
        ],
      };

      updateProfile(userData);
    }, 1000);
  }

  function fetchUserData() {
    const email = localStorage.getItem("email");
    // const email = "chiragsaxena728@gmail.com";
    console.log("Email:", email);

    fetch(
      // `https://paryatansetu.onrender.com/user/${email}`
      `http://192.168.31.252:5001/user/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Optional, but good practice
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data);
        const userData = {
          username: data.data.name,
          userType: data.data.userType,
          serviceType: data.data.serviceType,
          accounts: data.data.accounts,
          paymentHistory: data.data.paymentHistory,
          savedTrips: data.data.savedTrips,
          bookings: data.data.bookings,
        };
        updateProfile(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const fetchEmail = async () => {
    const emails = "chiragsaxena728@gmail.com";
    localStorage.setItem("email", emails);
  };

  // fetchEmail();

  function updateProfile(userData) {
    username.textContent = userData.username;
    userType.textContent = userData.userType;
    if (serviceType) {
      serviceType.textContent = userData.serviceType || "N/A";
    }

    // Populate account list
    accountList.innerHTML = "";
    userData.accounts.forEach((account) => {
      const li = document.createElement("li");
      li.textContent = account;
      li.addEventListener("click", () => switchAccount(account));
      accountList.appendChild(li);
    });

    // Populate payment history
    const paymentList = document.querySelector(".payment-list");
    if (paymentList) {
      paymentList.innerHTML = "";
      userData.paymentHistory.forEach((payment) => {
        const li = document.createElement("li");
        li.textContent = `${payment.date}: ${payment.description} - $${payment.amount}`;
        paymentList.appendChild(li);
      });
    }

    // Populate saved trips
    const tripGrid = document.querySelector(".trip-grid");
    if (tripGrid) {
      tripGrid.innerHTML = "";
      userData.savedTrips.forEach((trip) => {
        const div = document.createElement("div");
        div.className = "trip-card";
        div.innerHTML = `
                    <h3>${trip.name}</h3>
                    <p>Date: ${trip.date}</p>
                `;
        tripGrid.appendChild(div);
      });
    }

    // Populate bookings
    const bookingList = document.querySelector(".booking-list");
    if (bookingList) {
      bookingList.innerHTML = "";
      userData.bookings.forEach((booking) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <h3>${booking.name}</h3>
                    <p>Date: ${booking.date}</p>
                    <p>Status: ${booking.status}</p>
                `;
        bookingList.appendChild(li);
      });
    }
  }

  function switchAccount(accountName) {
    // Simulated account switching
    console.log(`Switching to account: ${accountName}`);
    currentAccountBtn.textContent = accountName;
    accountList.classList.remove("visible");
    fetchUserData(); // Fetch new user data for the switched account
  }

  // Initialize profile
  fetchUserData();
});
