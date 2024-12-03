document.addEventListener('DOMContentLoaded', () => {
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const form = document.querySelector('form');
    const serviceProviderField = document.querySelector('.service-provider-field');

    let userType = 'visitor';

    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            userType = btn.dataset.type;
            if (userType === 'service-provider' && serviceProviderField) {
                serviceProviderField.classList.remove('hidden');
            } else if (serviceProviderField) {
                serviceProviderField.classList.add('hidden');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (form.id === 'signup-form') {
            // Handle signup
            if (userType === 'service-provider') {
                const serviceType = document.getElementById('service-type').value;
                if (!serviceType) {
                    alert('Please select a service type');
                    return;
                }
                localStorage.setItem('serviceType', serviceType);
            }
            localStorage.setItem('userName', username);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userType', userType);
            alert('Signup successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            // Handle login
            const storedUserName = localStorage.getItem('userName');
            const storedUserEmail = localStorage.getItem('userEmail');
            const storedUserType = localStorage.getItem('userType');
            if (username === storedUserName && email === storedUserEmail && storedUserType === userType) {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials or user type');
            }
        }
    });
});