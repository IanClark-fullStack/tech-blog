const logoutHandler = async () => {
    // Make a POST request to destroy the session on the back end
    async function logout() {
      const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
document.querySelector('#logout-button').addEventListener('click', logoutHandler);