const { User } = require('../db/usermodel');
const bcrypt = require('bcrypt-nodejs');

const handleRegister = (req, res) => {
	const { email, name, password } = req.body;
	User.findOne({email}, (err, user) => {
		if (err || user) return res.status(401).json({
			msg: 'User with that email already exists. Please login'
		})
		const hash = bcrypt.hashSync(password);
		const newUser = new User({email, name, hash });
		newUser.save((err, user) => {
			if (err) return res.json('Couldn\'t register, try again');
			return res.json({user})
		});
	})
}

module.exports = {
	handleRegister : handleRegister
}