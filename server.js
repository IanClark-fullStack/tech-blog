const path = require('path');
// const bodyParser = require('body-parser')
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// All routes will be handled by conroller folder
const routes = require('./controllers');
// All helpers will be handled by utils folder
// const helpers = require('./utils/helpers');


// Sequalize will be setup using the config folder
const sequelize = require('./config/connection');
// Sequelize will have a store created using express-session npm package.
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize a new instance of the express server
const app = express();
// Use either production port or development port
const PORT = process.env.PORT || 3001;
// Create the express handlebars - To Pass Helper functions in use { helpers } as the argument. 
const hbs = exphbs.create();


// Attach a Defined session storage object to the sequalize Store 
const sess = {
    secret: 'admin',
    cookie: {}, 
    resave: false,
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })
};

// Global Middleware 
app.use(session(sess)); // Express session and store

app.engine('handlebars', hbs.engine); // use hbs
app.set('view engine', 'handlebars'); // Set the views 

app.use(express.json());
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); // Express will default to routes folder

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
});

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Application Listening at' + PORT));
// });




