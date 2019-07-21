const Clarifai = require('clarifai');
const { User } = require('../db/usermodel');
require('dotenv').config();

const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});


const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('error'))
}

const handleImage = async (req, res) => {
	const { id } = req.body;
    const findUser = await User.findById(id, (err, user) => {
		if (err) return res.json('Error occured');
		return;
	}).select('entries');
	let updatedEntry = findUser.entries + 1;
	User.findByIdAndUpdate(id, {entries : updatedEntry}, (err, data) => {
		if (err) return res.status(400).json('Error updating');
		data.entries = updatedEntry;
		return res.json(data.entries);
	})
}

module.exports = {
	handleImage,
	handleApiCall
}