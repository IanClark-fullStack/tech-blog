
const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');


// Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link routes back to homeRoutes /signup > renders Signup Form with Event Listener attached > Send Fetch request to /api/users endpoint. 

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['[password'] }
        });
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        User.findOne({
            attributes: { exclude: ['pass'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Blogpost,
                    attributes: [
                        'id',
                        'title',
                        'post_body',
                        'date'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'content', 'date'],
                    include: {
                        model: Blogpost,
                        attributes: ['title']
                    }
                },
                {
                    model: Blogpost,
                    attributes: ['title'],
                }
            ]
        })
        
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// try {

// } catch (err) {

// }


// router.post('/', (req, res) => {
//     try {
//         console.log(req.body);
//         // const userBirth = User.create({
//         //     name: req.body.name,
//         //     pass: req.body.pass
//         // })
//         // req.session.save(() => {
//         //     req.session.user_id = userBirth.id;
//         //     req.session.name = userBirth.name;
//         //     req.session.logged_in = true;

//         //     res.json(userBirth);
//         // });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// SignUp Route Handler - Where /api/users === '/'


// Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link routes back to homeRoutes /signup > renders Login Form with Event Listener attached > Fetch to /api/users/login
// Where '/api/users/login === '/login'
router.post('/login', async (req, res) => {
    
    try {
        console.log(req.body);
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.pass);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.logged_in = true;

            
        });
        res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
        console.log(err);
            res.status(500).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




// router.delete('/:id', async (req, res) => {
//     try {
//         const endUser = await User.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         if (!endUser) {
//             res.status(404).json({ message: 'No user found with this id' });
//             return;
//         }
//         res.json(endUser);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

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

