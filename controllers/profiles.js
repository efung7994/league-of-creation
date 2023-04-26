import { Profile } from '../models/profile.js'

function show(req, res) {
  Profile.findById(req.params.profileId)
  .populate(['champions', 'roles'])
  .then(profile => {
    res.render('profiles/show', {
      profile,
      title: 'Show Profile'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  show,
}