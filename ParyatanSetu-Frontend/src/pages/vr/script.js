document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const imageCards = document.querySelectorAll('.image-card');

    // Add animation delay to cards
    imageCards.forEach((card, index) => {
        card.style.setProperty('--i', index + 1);
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        imageCards.forEach(card => {
            const placeName = card.getAttribute('data-name').toLowerCase();
            if (placeName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Click handler for VR views
    imageCards.forEach(card => {
        card.addEventListener('click', function() {
            const placeName = this.getAttribute('data-name');
            switch(placeName) {
                case 'taj mahal':
                    window.location.href = 'vrviews/taj.html';
                    break;
                case 'delhi':
                    window.location.href = 'vrviews/delhi.html';
                    break;
                case 'mumbai':
                    window.location.href = 'vrviews/mumbai.html';
                    break;
                case 'goa':
                    window.location.href = 'vrviews/goa.html';
                    break;
                case 'hampi':
                    window.location.href = 'vrviews/hampi.html';
                    break;
                case 'jaipur':
                    window.location.href = 'vrviews/jaipur.html';
                    break;
                case 'ladakh':
                    window.location.href = 'vrviews/ladakh.html';
                    break;
                case 'kashmir':
                    window.location.href = 'vrviews/kashmir.html';
                    break;
                case 'sikkim':
                    window.location.href = 'vrviews/sikkim.html';
                    break;
                case 'varanasi':
                    window.location.href = 'vrviews/varanasi.html';
                    break;
                case 'goldentemple':
                    window.location.href = 'vrviews/golden.html';
                    break;
                case 'darjeeling':
                    window.location.href = 'vrviews/darjeeling.html';
                    break;
                case 'amber':
                    window.location.href = 'vrviews/amber.html';
                    break;
            }
        });
    });
}); 