import { Champion } from "../models/champion.js"

function index(req, res) {
  Champion.find({})
  .populate('owner')
  .then(champions => {
    console.log(champions);
    res.render('champions/index', {
      champions,
      title: "Champions"
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