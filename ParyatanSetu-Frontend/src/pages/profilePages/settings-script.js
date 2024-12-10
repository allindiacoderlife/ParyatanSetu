// Save settings function
function saveSettings() {
    const visibility = document.getElementById('profileVisibility').checked;
    // Save to backend/localStorage
    alert('Settings saved successfully!');
}

// Handle sign out
function handleSignOut() {
    if (confirm('Are you sure you want to sign out?')) {
        // Perform sign out logic here
        window.location.href = '/login'; // Redirect to login page
    }
}

// Handle account deletion
function confirmDelete() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('Please confirm again that you want to permanently delete your account.')) {
            // Perform delete account logic here
            alert('Account deleted successfully');
            window.location.href = '/signup'; // Redirect to signup page
        }
    }
} 