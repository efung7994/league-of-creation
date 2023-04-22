import { Profile } from '../models/profile.js'

function index(req, res, next) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles', {
      profiles,
			title: "Profile",
      user: req.user
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index
}