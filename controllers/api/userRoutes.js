const router = require('express').Router();
const { User } = require('../../models');


// Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link routes back to homeRoutes /signup > renders Signup Form with Event Listener attached > Send Fetch request to /api/users endpoint. 
// SignUp Route Handler - Where /api/users === '/'
router.post('/', async (req, res) => {
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
            res.json(userBirth);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link routes back to homeRoutes /signup > renders Login Form with Event Listener attached > Fetch to /api/users/login
// Where '/api/users/login === '/login'
router.post('/login', async (req, res) => { 
    try {
        console.log(req.body);
        const user = await User.findOne({where: { email: req.body.email, }, });
        console.log(user);
        if (!user) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = user.checkPassword(req.body.pass);
        if (!validPassword) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        req.session.save(() => {
            req.session.user = user.id;
            req.session.email = user.username;
            req.session.logged_in = true;
      
            res.json({ user, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Login failed' });
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