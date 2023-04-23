import { Profile } from '../models/profile.js'
import { Champion } from "../models/champion.js"

function index(req, res, next) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles', {
      profiles,
			title: "Profile",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.profileId)
  .populate('champions')
  .then(profile => {
    res.render('profiles/show', {
      profile,
      title: 'Show Profile'
    })
  })
  Champion.findById()
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  show,
}