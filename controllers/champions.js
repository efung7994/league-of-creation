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
  Champion.create(req.body)
  .then(champion => {
    res.redirect(`/champions/${champion._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/champions/new')
  })
}

function show(req, res) {
  Champion.findById(req.params.championId)
  .populate('owner')
  .then(champion => {
    res.render('champions/show', {
      champion,
      title: 'Show Champion'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Champion.findById(req.params.championId)
  .then(champion => {
    res.render('champions/edit', {
      champion,
      title: "Edit champion"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Champion.findById(req.params.championId)
  .then(champion => {
    if (champion.owner.equals(req.user.profile._id)) {
      champion.updateOne(req.body)
      .then(()=> {
        res.redirect('/champions')
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
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
  show,
  edit,
  update,
}