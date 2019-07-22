const { User } = require('../db/usermodel')

 const handleProfileGet = (req, res) => {
	const { id } = req.params;
	User.findById(id, (err, user) => {
		if(err) return res.json('Error getting profile');
		return res.json(user);
	});
 }

module.exports = {
	handleProfileGet
}