const router = require('express').Router();
const fetch = require('node-fetch');
const User = require('../models/user');
const yelp = 'https://api.yelp.com/v3/businesses/search?categories=bars&location=';


router.get('/api/user', (req, res) => {
  req.user ? res.json(req.user) : res.status(404).send('USER NOT FOUND');
});


router.get('/api/search/:location', (req, res) => {
  let url = yelp + req.params.location;

  fetch(url, {
    headers: {
			'Authorization': 'Bearer dADo4cyTdrpLUoxkTK3gYv9xGPqnU2NScdmVYSAWBuvkx_1_wbs9a8ULtpXOCQpfyOngIsIR-HkpOSm3A1I1-7gzZEF-r2QHFjRlCANIbUzM81haPQSNeYAXx8mdWnYx',
			'Accept': 'application/json'
		}
	})
  .then((res) => res.json())
  .then((data) => {
    data.error ? res.json(data) : res.json(data.businesses);
  })
  .catch((err) => console.log(err))
});


router.post('/api/addToGoingList', (req, res) => {
  let { user, bar } = req.body;

  User.findOneAndUpdate({ 'google.id': user.id }, { $push: { goingList: bar } }, { new: true }).then((updatedUser) => {
    res.json(updatedUser.goingList);
  });
});

router.post('/api/removeFromGoingList', (req, res) => {
  let { user, bar } = req.body;

  User.findOneAndUpdate({ 'google.id': user.id }, { $pull: { goingList: { id: bar.id } } }, { new: true }).then((updatedUser) => {
    res.json(updatedUser.goingList);
  });
});


module.exports = router;
