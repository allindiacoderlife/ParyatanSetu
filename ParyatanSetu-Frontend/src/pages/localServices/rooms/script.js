document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const dateInput = document.getElementById('date-input');
    const loader = document.getElementById('loader');
    const noResults = document.getElementById('no-results');

    searchButton.addEventListener('click', performSearch);

    function performSearch() {
        if (searchInput.value.trim() === '' || dateInput.value === '') {
            alert('Please enter both destination and date.');
            return;
        }

        loader.style.display = 'block';
        noResults.style.display = 'none';

        // Simulating an API call
        setTimeout(() => {
            loader.style.display = 'none';
            noResults.style.display = 'block';
        }, 2000);
    }

    // Add parallax effect to the main section
    // window.addEventListener('scroll', () => {
    //     const mainSection = document.querySelector('.main-section');
    //     const scrollPosition = window.pageYOffset;
    //     mainSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    // });
    
});