document.addEventListener("DOMContentLoaded", () => {
  const userTypeBtns = document.querySelectorAll(".user-type-btn");
  const form = document.querySelector("form");
  const serviceProviderField = document.querySelector(
    ".service-provider-field"
  );

  let userType = "visitor";

  userTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      userTypeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      userType = btn.dataset.type;
      if (userType === "service-provider" && serviceProviderField) {
        serviceProviderField.classList.remove("hidden");
      } else if (serviceProviderField) {
        serviceProviderField.classList.add("hidden");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const userData = {
      name: user,
      email: email,
      password: pass,
      userType: userType,
      accounts: [],
      paymentHistory: [],
      savedTrips: [],
      bookings: [],
    };

    const handleRegister = (userType, data) => {
      fetch(
        `https://paryatansetu.onrender.com/register/${userType}`,
        // `http://192.168.83.252:5001/register/${userType}`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "Ok") {
            alert("Signup successful! Please log in.");
            window.location.href = "login.html";
          } else {
            alert("Signup failed");
          }
        });
    };

    const handleLogin = (userType, data) => {
      fetch(
        `https://paryatansetu.onrender.com/login/${userType}`,
        // `http://192.168.83.252:5001/login/${userType}`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "Ok") {
            alert("Login successful!");
            localStorage.setItem("email", data.email);
            window.location.href = "index.html";
          } else {
            alert("Login failed");
          }
        });
    };

    if (form.id === "signup-form") {
      console.log("Register");
      if (userType === "service-provider") {
        const type = document.getElementById("service-type").value;
        const providerData = {
          name: user,
          email: email,
          password: pass,
          serviceType: type,
        };
        if (!type) {
          alert("Please select a service type");
          return;
        }
        console.log("provider", providerData);
        handleRegister("provider", providerData);
      } else {
        console.log("user");
        handleRegister("user", userData);
      }
    } else {
      console.log("Login");
      if (userType === "service-provider") {
        handleLogin("provider", userData);
      } else {
        handleLogin("user", userData);
      }
    }
  });


  // fetchUserData

  const fetchUserData = ({email}) => {
    fetch(
      `https://paryatansetu.onrender.com/user/${email}`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Ok") {
          populateUserData(data.userData);
        } else {
          alert("User not found");
        }
      });
  }
});


