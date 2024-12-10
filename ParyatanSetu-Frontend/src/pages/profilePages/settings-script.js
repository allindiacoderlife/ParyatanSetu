// Save settings function
function saveSettings() {
  const visibility = document.getElementById("profileVisibility").checked;
  // Save to backend/localStorage
  alert("Settings saved successfully!");
}

// Handle sign out
function handleSignOut() {
  if (confirm("Are you sure you want to sign out?")) {
    // Perform sign out logic here
    localStorage.removeItem("email"); // Remove user from localStorage
    window.location.href = "ParyatanSetu-Frontend/src/pages/index.html"; // Redirect to login page
  }
}

// Handle account deletion
function confirmDelete() {
  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    if (
      confirm(
        "Please confirm again that you want to permanently delete your account."
      )
    ) {
      deleteAcc();
      // Perform delete account logic here
      alert("Account deleted successfully");
      window.location.href = "/signup"; // Redirect to signup page
    }
  }
}

const deleteAcc = async () => {
  const email = localStorage.getItem("email");
  fetch(`https://paryatansetu.onrender.com/users/delete/${email}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("email");
    });
};
