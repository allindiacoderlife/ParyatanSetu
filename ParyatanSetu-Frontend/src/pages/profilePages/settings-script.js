document.addEventListener('DOMContentLoaded', () => {
    const visibilityForm = document.getElementById('visibility-form');
    const publicProfileCheckbox = document.getElementById('public-profile');
    const addAccountBtn = document.getElementById('add-account');
    const accountList = document.getElementById('account-list');
    const deleteAccountBtn = document.getElementById('delete-account');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const backToProfileLink = document.getElementById('back-to-profile');

    // Load saved settings
    function loadSettings() {
        const isPublic = localStorage.getItem('publicProfile') === 'true';
        publicProfileCheckbox.checked = isPublic;

        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        updateAccountList(accounts);
    }

    // Save visibility settings
    visibilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isPublic = publicProfileCheckbox.checked;
        localStorage.setItem('publicProfile', isPublic);
        alert('Profile visibility settings saved!');
    });

    // Add new account
    addAccountBtn.addEventListener('click', () => {
        const accountName = prompt('Enter the name for the new account:');
        if (accountName) {
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            accounts.push(accountName);
            localStorage.setItem('accounts', JSON.stringify(accounts));
            updateAccountList(accounts);
        }
    });

    // Update account list
    function updateAccountList(accounts) {
        accountList.innerHTML = '';
        accounts.forEach(account => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${account}
                <button class="delete-account-btn" data-account="${account}">Delete</button>
            `;
            accountList.appendChild(li);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-account-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const accountToDelete = e.target.getAttribute('data-account');
                deleteAccount(accountToDelete);
            });
        });
    }

    // Delete account
    function deleteAccount(accountName) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const updatedAccounts = accounts.filter(account => account !== accountName);
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        updateAccountList(updatedAccounts);
    }

    // Show delete account confirmation modal
    deleteAccountBtn.addEventListener('click', () => {
        confirmationModal.classList.remove('hidden');
    });

    // Confirm account deletion
    confirmDeleteBtn.addEventListener('click', () => {
        // Perform account deletion logic here
        alert('Account deleted successfully!');
        confirmationModal.classList.add('hidden');
        // Redirect to login page or perform any other necessary action
    });

    // Cancel account deletion
    cancelDeleteBtn.addEventListener('click', () => {
        confirmationModal.classList.add('hidden');
    });

    // Back to profile link
    backToProfileLink.addEventListener('click', (e) => {
        e.preventDefault();
        const userType = localStorage.getItem('userType');
        if (userType === 'visitor') {
            window.location.href = 'visitor-profile.html';
        } else if (userType === 'service-provider') {
            window.location.href = 'service-provider-profile.html';
        } else {
            window.location.href = 'index.html';
        }
    });

    // Initialize settings
    loadSettings();
});