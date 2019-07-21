const { User } = require('../db/usermodel');
const bcrypt = require('bcrypt-nodejs');


const handleSignIn = (req, res) => {
	const { email, password } = req.body;
	User.findOne({email}, (err, user) => {
		if (err || !user) return res.status(401).json('Wrong credentials');
		const isValid = bcrypt.compareSync(password, user.hash);
		if(isValid) {
			return res.json({user})
		}else {
			return res.status(401).json('Unauthorized')
		}
	}).select('name email entries joined');
}

module.exports = {
	handleSignIn
}

