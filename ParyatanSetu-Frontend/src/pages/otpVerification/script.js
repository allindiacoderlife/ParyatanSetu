document.addEventListener("DOMContentLoaded", () => {
  const aadharForm = document.getElementById("aadharForm");
  const otpForm = document.getElementById("otpForm");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  let dataValue = {};
  let aadharNo = "";
  if (aadharForm) {
    aadharForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const aadharId = document.getElementById("aadharId").value;
      if (aadharId.length === 12 && /^\d+$/.test(aadharId)) {
        // window.location.href = 'otp.html';
        console.log("Aadhar ID:", aadharId);
        aadharNo = aadharId;
        fetch(
          "https://132f13cf-0ea9-498f-8332-e875469ebeee.mock.pstmn.io/generate-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ aadhaarNumber: aadharId }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            dataValue = data;
            if (dataValue.status === "success") {
              localStorage.setItem("aadharNo", aadharNo);
              localStorage.setItem("otpReference", dataValue.otpReference);
              console.log(dataValue);
              window.location.href = "otp.html";
            }
            // { status: "success", message: "OTP generated successfully", otpReference: "ABC123" }
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
        let aadharNo = localStorage.getItem("aadharNo");
        let otpReference = localStorage.getItem("otpReference");
        const verify = {
          aadhaarNumber: aadharNo,
          otpReference: otpReference,
          otp: otp,
        };
        console.log(verify);
        fetch("https://132f13cf-0ea9-498f-8332-e875469ebeee.mock.pstmn.io", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verify),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              console.log(data);
              localStorage.removeItem("aadharNo");
              localStorage.removeItem("otpReference");
              popup.style.display = "flex";
            }
          });
      } else {
        alert("Please enter a valid 4-digit OTP.");
      }
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
});
