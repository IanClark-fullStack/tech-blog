// Functionality defined as an Even Handler for the SUBMIT 

// Collect email and pass values 

// Make a fetch request to userRoutes/login (Which will GET input values, compare hashedPass to Regular and send Flag back of LOGGED_IN)
    // The method of the fetch request, is a POST, creating new body content in the form of JSON stringified Object {email, pass}
    // send along the content type in the header

    // After we get a response from userRoutes, 
        // success = Refresh page. Because we now have a logged_in flag added to the session (sequelize database), that will render the homepage differently. 

        // fail = alert
//DONE


