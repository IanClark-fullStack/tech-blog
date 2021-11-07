


/*  
The first Route Handler Definition 

- Invoked by Login Form Submit button

// Data Sent via Public > js > login.js (where we collect the value entered on the form and await a response of making a fetch request to 'login' endpoint, defined in userRoutes. 



- Post method at the endpoint: api/login

    - Try to Find One user from the users Data, where email field, matches req.body.email

        - If we can't find, send an error message, 

        - If we do find it, we need to validate the password, 
            - Password validation is the resulting BOOLEAN value produced by invoking the INSTANCE Method, Defined within the USER model (compareSync)
            - If the result is false, return 

            - If the result is TRUE, 
                - Save the value in our Request.session Object
                - req.session.save(() => {
                    req.session.Where we can access value of The Current User and Save them to the SESSION 
                    
                    AND _________

                    req.session.ANY_Property_You_want_to_Save
                    (this is where we defined logged_in)
                })

*/