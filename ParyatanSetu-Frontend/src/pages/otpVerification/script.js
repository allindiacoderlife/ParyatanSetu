document.addEventListener("DOMContentLoaded", () => {
  const aadharForm = document.getElementById("aadharForm");
  const otpForm = document.getElementById("otpForm");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  if (aadharForm) {
    aadharForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const aadharId = document.getElementById("aadharId").value;
      const otp = Math.floor(1000 + Math.random() * 9000);
      if (aadharId.length === 12 && /^\d+$/.test(aadharId)) {
        // window.location.href = 'otp.html';
        console.log("Aadhar ID:", aadharId);
        fetch("http://192.168.31.252:5001/aadhar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ aadharNumber: aadharId, otp: otp }),
        })
          .then((res) => {
            localStorage.setItem("aadharId", aadharId);
            localStorage.setItem("otp", otp);
            console.log(res);
            return res.text();
          })
          .then((rawData) => {
            console.log("Raw response:", rawData);
            window.location.href = "otp.html";
          });
        setTimeout(() => {
          localStorage.removeItem("otp");
        });
      } else {
        alert("Please enter a valid 12-digit Aadhar ID.");
      }
    });
  }

  if (otpForm) {
    const otpInputs = otpForm.querySelectorAll("input");

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        if (e.target.value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && e.target.value.length === 0) {
          if (index > 0) {
            otpInputs[index - 1].focus();
          }
        }
      });
    });

    otpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const otp = Array.from(otpInputs)
        .map((input) => input.value)
        .join("");
      if (otp.length === 4 && /^\d+$/.test(otp)) {
        console.log("OTP:", otp);
        const storedOtp = localStorage.getItem("otp");
        if (otp === storedOtp) {
          localStorage.removeItem("otp");
          localStorage.removeItem("aadharId");
          popup.style.display = "block";
        } else {
          alert("Invalid OTP.");
        }
      } else {
        alert("Please enter a valid 4-digit OTP.");
      }
    });

    const resendButton = document.getElementById("resend");

    resendButton.addEventListener("click", () => {
      const aadharId = localStorage.getItem("aadharId");
      if (aadharId) {
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        fetch("http://192.168.31.252:5001/aadhar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ aadharNumber: aadharId, otp: newOtp }),
        })
          .then((res) => {
            localStorage.setItem("otp", newOtp);
            console.log(res);
            return res.text();
          })
          .then((rawData) => {
            console.log("Raw response:", rawData);
            alert("A new OTP has been sent.");
          });
      } else {
        alert("Aadhar ID not found. Please start the process again.");
      }
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
});
