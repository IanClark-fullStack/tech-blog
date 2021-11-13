// Step 3 :: Main.handlebars Login link > homeRoutes Renders Login Form > Event Handler 
const loginFormEvent = async function(e) {
    e.preventDefault();
    // Grab the user input 
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
// Only if both values exist
    // Then send the values to the server
        // Make a fetch request to userRoutes/login (Which will GET input values, compare hashedPass to Regular and send Flag back of LOGGED_IN)
        const response = await fetch('/api/users/login', { 
            method: 'POST', // The method of the fetch request, is a POST,
            body: JSON.stringify({ // body content as JSON stringified Object {email, pass}
                email: email,
                pass: pass, 
                }), 
            header: { 'Content-Type': 'application/json' }, // send along the content type in the header
        });
    if (response.ok) { // After we get a response from userRoutes, 
        // success = Refresh page. Because we now have a logged_in flag added to the session (sequelize database), that will render the homepage differently. 
        document.location.replace('/dashboard');
    } else {
        alert(`Yuht-Oh, Login attempt failed`);
        console.log(response);
    }
};
document.getElementById('login-form').addEventListener('submit', loginFormEvent);



