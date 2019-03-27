const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'guowanqi',
    password : '',
    database : 'brain'
  }
});

const register = require('./controllers/Register');
const profile = require('./controllers/Profile');
const signin = require('./controllers/Signin');
const image = require('./controllers/Image');

const port=3001;
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));
app.use(cors());

app.get('/', (req, res) => {res.send('working');});
app.post('/signin',(req,res)=>
{signin.handleSignin(req,res,knex,bcrypt)});
app.post('/register', (req,res)=>
{register.handleRegister(req,res,knex,bcrypt)});

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,knex)});

app.put('/image',(req,res)=>{image.handleImage(req,res,knex)})
app.post('/api',(req,res)=>{image.handleAPI(req,res)})

app.listen(process.env.PORT||port,()=>{
    console.log('server running on port',process.env.PORT)
});
