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

    form.addEventListener('submit', e => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        const data = {
            user: user,
            email: email,
            password: pass,
        };

        if (userType === 'visitor') {
            console.log("user", data);
            fetch('http://192.168.83.252:5001/register', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
        }
    });
});
