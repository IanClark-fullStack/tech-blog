const router = require('express').Router();
const { User } = require('../../models');


/*
The first Route Handler Definition 

- Invoked by Login Form Submit button

// Data Sent via Public > js > login.js (where we collect the value entered on the form and await a response of making a fetch request to 'login' endpoint, defined in userRoutes. 
router.
*/

// - Post method at the endpoint: api/login
router.post('/login', async (req, res) => {
    try {
        // Try to Find One user from the users Data, where email field, matches req.body.email
        const userData = await User.findOne(
            { 
                where: {
                    email: req.body.email
                }
            }
        );
        // If we can't find, send an error message, 
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // If we do find it, we need to validate the password, 
        // Password validation is the resulting BOOLEAN value produced by invoking the INSTANCE Method, Defined within the USER model (compareSync)
        const passwordValidation = await userData.checkPassword(req.body.pass);
        // If the result is false, return 
        if (!passwordValidation) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // If the result is TRUE, 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true; 
            res.status(200).json({ userData, message: 'You are logged in!' })
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create User - Fetch request made from Public > Login JS Event Handler
router.post('/signup', async (req, res) => {
    try {

        console.log('Create User Heard');

        const userBirth = await User.create({
                name: req.body.name,
                email: req.body.email,
                pass: req.body.pass
        });

        console.log(userBirth);

        req.session.save(() => {
            req.session.user_id = userBirth.id;
            req.session.
            req.session.logged_in = true; 
            res.status(200).json(userBirth);
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
        
module.exports = router;