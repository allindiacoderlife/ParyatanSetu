// Handle Contact Form Submission
document.querySelector("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // Simulate form submission
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Display success message
  const successMessage = document.querySelector("#successMessage");
  successMessage.classList.remove("hidden");

  // Reset the form
  document.querySelector("#contactForm").reset();

  // Hide the message after 3 seconds
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 3000);

  // Send data to the server
  const data = {
    name: name,
    email: email,
    feedback: message,
  };

  fetch(
    // "http://192.168.31.252:5001/feedback"
    "https://paryatansetu.onrender.com/feedback"
    , {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
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
});
