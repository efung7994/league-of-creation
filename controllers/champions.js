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

function newChampion(req, res) {
  res.render('champions/new', {
    title: 'Add Champion'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.tasty = !!req.body.tasty
  Champion.create(req.body)
  .then(champion => {
    res.redirect(`/champions/${champion._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  create,
  newChampion as new,
}