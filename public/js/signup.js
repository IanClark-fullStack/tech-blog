// Step 6 :: Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link routes back to homeRoutes /signup > renders Signup Form with Event Listener attached
const signupFormHandler = async function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass = document.getElementById('signup-pass').value.trim();

    const response = await fetch('/api/users', { // Where /api/users === '/'
        method: 'POST',
        body: JSON.stringify({ name, email, pass }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard'); 
    } else {
        alert('Signup Sucks');
    }
}; 
document.getElementById('signup-form').addEventListener('submit', signupFormHandler);
