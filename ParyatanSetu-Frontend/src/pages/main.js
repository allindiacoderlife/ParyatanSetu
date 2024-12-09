// Contact form submission (for demonstration purposes)
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const payload = {
    name,
    email,
    message,
  };

  console.log(payload);

  fetch(
    "https://paryatansetu.onrender.com/send",
    // "http://192.168.83.252:5001/send",
    {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => {
      console.log(res); // Log the raw response
      return res.text(); // Use text() to avoid JSON parsing errors
    })
    .then((rawData) => {
      console.log("Raw response:", rawData);
      try {
        const jsonData = JSON.parse(rawData);
        console.log(jsonData);
        if (jsonData.status === "Ok") {
          alert("Message sent!");
        } else {
          alert("Message failed to send");
        }
      } catch (error) {}
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
  // contactForm.reset();
});

const userMenuButton = document.querySelector(".user-menu-button");
const userInitial = document.querySelector(".user-initial");
const usersInitial = document.querySelector(".users-initial");

// User menu

const fetchUser = async () => {
  const email = localStorage.getItem("email");
  if (email) {
    userInitial.classList.remove("hidden");
    usersInitial.classList.add("hidden");
  } else {
    userInitial.classList.add("hidden");
    usersInitial.classList.remove("hidden");
  }
};

fetchUser();

userMenuButton.addEventListener("click", () => {
  const email = localStorage.getItem("email");
  if (email) {
    // fetchUser();
    window.location.href = "../pages/profilePages/visitor-profile.html";
  } else {
    window.location.href = "login.html";
  }
});

const fetchEmail = async () => {
  const emails = "chiragsaxena728@gmail.com";
  localStorage.setItem("email", emails);
};

// fetchEmail();

const removeEmail = async () => {
  localStorage.removeItem("email");
};

// removeEmail();

