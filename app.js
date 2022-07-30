require('dotenv').config();
const express=require('express')
const path=require('path');
const expHbs=require('express-handlebars');
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
app.set("view engine", "handlebars");

app.engine("handlebars", hbs.engine);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use(routes)

app.get('/',(req,res)=>{
    res.send('hi')
})
//catch http errors: 
app.use((req,res,next)=>{
    next(createError.NotFound('this route does not exit'))
})
app.use((err,req,res,next)=>{
    res.json({
        status:err.status ||500,
        message: err.message
    })
})
// Sync database connection and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
});
  