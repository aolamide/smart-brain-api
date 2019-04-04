const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: 'd011f9b4892745979de92aac0b4e3c8c'
});


const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('error'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch (err => res.status(400).json('unable to get users'))
	
}

module.exports = {
	handleImage,
	handleApiCall
}