document.addEventListener('DOMContentLoaded', () => {
    const aadharForm = document.getElementById('aadharForm');
    const otpForm = document.getElementById('otpForm');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    if (aadharForm) {
        aadharForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const aadharId = document.getElementById('aadharId').value;
            if (aadharId.length === 12 && /^\d+$/.test(aadharId)) {
                window.location.href = 'otp.html';
            } else {
                alert('Please enter a valid 12-digit Aadhar ID.');
            }
        });
    }

    if (otpForm) {
        const otpInputs = otpForm.querySelectorAll('input');
        
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value.length === 0) {
                    if (index > 0) {
                        otpInputs[index - 1].focus();
                    }
                }
            });
        });

        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const otp = Array.from(otpInputs).map(input => input.value).join('');
            if (otp.length === 4 && /^\d+$/.test(otp)) {
                popup.style.display = 'flex';
            } else {
                alert('Please enter a valid 4-digit OTP.');
            }
        });
    }

    if (closePopup) {
        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
});

