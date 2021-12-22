const logoutHandler = async () => {
  // e.preventDefault();
    // Make a POST request to destroy the session on the back end
      const response = await fetch('/api/users/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    };
  
const fixLogoutPlease = document.getElementById('logout-button');
console.log(fixLogoutPlease);
fixLogoutPlease.addEventListener("click", logoutHandler);