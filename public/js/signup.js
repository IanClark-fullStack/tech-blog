// Step 6 :: Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link routes back to homeRoutes /signup > renders Signup Form with Event Listener attached
const signupFormHandler = async function(e) {
    e.preventDefault();
    // const form = e.currentTarget;
    // const formData = new FormData(form);
    // console.log(formData);
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass = document.getElementById('signup-pass').value.trim();
    
 
    //  FIX : Grab form Entries, save to an array of key/value pairs
    // const entryData = Object.fromEntries(formData.entries()); 
    // console.log(entryData);
    
    // FIX Stringify Entries
    // const entryStrings = JSON.stringify(entryData); 
    // console.log(entryStrings);

    const response = await fetch('/api/users/signup', 
    { // Where /api/users === '/'
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            pass: pass
        }),
        headers: { 
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        
    
        }
);
    if (response.ok) {
        document.location.replace('/dashboard'); 
    } else {
        alert('Signup Sucks');
    }
}; 
document.getElementById('signup-form').addEventListener('submit', signupFormHandler);
