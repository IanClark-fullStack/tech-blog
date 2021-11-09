

// Event Handler for the SUBMIT 
const loginFormEvent = async (e) => {
    e.preventDefault();
    // Grab the user input 
    const inputEmail = document.querySelector('#login-email').value.trim();
    const inputPass = document.querySelector('#login-pass').value.trim();
    // Only if both values exist
    if (inputEmail && inputPass) {
        console.log(`TEST for inputs email ${inputEmail} and password ${inputPass}`);
    // Then send the values to the server
        // Make a fetch request to userRoutes/login (Which will GET input values, compare hashedPass to Regular and send Flag back of LOGGED_IN)
        const res = await fetch('/api/users/login', {
            // The method of the fetch request, is a POST,
            method: 'POST',
            // creating new body content in the form of JSON stringified Object {email, pass}
            body: JSON.stringify({ inputEmail, inputPass }),
            // send along the content type in the header
            header: { 'Content-Type': 'application/json' },
        });
        if (res.ok) { // After we get a response from userRoutes, 
            // success = Refresh page. Because we now have a logged_in flag added to the session (sequelize database), that will render the homepage differently. 
            document.location.replace('/');
        } else {
                // fail = alert
                alert(`Yuht-Oh, Login attempt failed`);
        }
    }
    
};
// Event Handler for the SUBMIT 
const signupFormEvent = async (e) => {
    e.preventDefault();
    // Grab the user input 
    const signUpName = document.querySelector('#signup-name').value.trim();
    const signUpEmail = document.querySelector('#signup-email').value.trim();
    const inputUpPass = document.querySelector('#signup-pass').value.trim();
    // Only if both values exist
    if (inputEmail && inputPass) {
        console.log(`TEST for inputs email ${inputEmail} and password ${inputPass}`);
    // Then send the values to the server
        // Make a fetch request to userRoutes/login (Which will GET input values, compare hashedPass to Regular and send Flag back of LOGGED_IN)
        const res = await fetch('/api/users/signup', {
            // The method of the fetch request, is a POST,
            method: 'POST',
            // creating new body content in the form of JSON stringified Object {email, pass}
            body: JSON.stringify({ inputEmail, inputPass }),
            // send along the content type in the header
            header: { 'Content-Type': 'application/json' },
        });
        if (res.ok) { // After we get a response from userRoutes, 
            // success = Refresh page. Because we now have a logged_in flag added to the session (sequelize database), that will render the homepage differently. 
            document.location.replace('/');
        } else {
                // fail = alert
                alert(`Yuht-Oh, Login attempt failed`);
        }
    }
    
};
document.querySelector('#login-form').addEventListener('submit', loginFormEvent);
document.querySelector('#signup-form').addEventListener('submit', signUpFormEvent);

    
    

   
// const exitFormEvent = (e) => {
//     e.preventDefault();
//     document.getElementById('form-wrap').className('');
// }

// const openFormEvent = (e) => {
//     e.preventDefault();
//     // Spread Class List Array into argument. 
//     document.getElementById('form-wrap').classList.add('block', 'opacity-1');
// }

// document.getElementById('open-form').addEventListener('click', openFormEvent);
// document.getElementById('exit-form').addEventListener('click', exitFormEvent);



