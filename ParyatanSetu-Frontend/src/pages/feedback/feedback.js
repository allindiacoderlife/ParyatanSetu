// Handle Contact Form Submission
document.querySelector('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    // Simulate form submission
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    // Display success message
    const successMessage = document.querySelector('#successMessage');
    successMessage.classList.remove('hidden');

    // Reset the form
    document.querySelector('#contactForm').reset();

    // Hide the message after 3 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
});
