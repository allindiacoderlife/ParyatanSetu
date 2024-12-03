document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const query = new URLSearchParams(formData).toString();

    const resultsContainer = document.getElementById('eventResults');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`/api/events?${query}`);
        const events = await response.json();

        resultsContainer.innerHTML = events.map(event => `
            <div class="event-item">
                <h3>${event.title}</h3>
                <p>${event.date}</p>
                <p>${event.location}</p>
            </div>
        `).join('');
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error loading events. Please try again.</p>';
    }
});
