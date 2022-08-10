require('dotenv').config();
const express=require('express')
const path=require('path');
const expHbs=require('express-handlebars');
const cons = require('consolidate')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const createError=require('http-errors')

const sequelize = require("./config/config");
const helpers=require("./utils/hb-helpers.js")
const routes = require('./routes')

const PORT = process.env.PORT ||3001;

const app=express();


const sess = {
    secret: process.env.SESS_SECRET,
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize }),
  };

const hbs = expHbs.create({ helpers });
//set up 
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use(routes)

app.get('/',(req,res)=>{
    res.send('hi')
})
//catch http errors: 
app.use((req,res,next)=>{
    next(createError(404))
})
app.use((err,req,res,next)=>{
    
    if (err.status === 404) {
        return res.status(400).render('404.handlebars');
    }

    if (err.status === 500) {
        return res.status(500).render('500.handlebars'); 
    }

   next();
})
// Sync database connection and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
});
  