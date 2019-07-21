const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

require('dotenv').config();


//Connect to database
db.connect();


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('it is working');
})



app.post('/signin', (req, res) => { signIn.handleSignIn(req, res) });

app.post('/register', (req, res) => { register.handleRegister(req, res)});

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res) });

app.put('/image', (req, res) => { image.handleImage(req, res)}  );

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} );



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});