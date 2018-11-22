const express = require('express');
const path = require('path');
const expshbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load DB models
require('./models/User');
require('./models/Story');
// Passport config
require('./config/passport')(passport);

// Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');


// Load keys
const keys = require('./config/keys');

// Handlebars helpers
const {
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
} = require('./helpers/hbs');

// Map global promise
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.log(err);
    });


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));


// Handlebars middleware
app.engine('handlebars', expshbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));     // Very important, How to create static folder ?

//use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);


var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started on port : " + port);
});