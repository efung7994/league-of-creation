import { Champion } from "../models/champion.js"
import { Profile } from '../models/profile.js'
import { Role } from "../models/role.js"

function index(req, res) {
  Champion.find({})
  .populate('owner')
  .then(champions => {
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
    Profile.findById(req.user.profile)
    .then(profile => {
      profile.champions.push(champion)
      profile.save()
      .then(()=> {
        res.redirect(`/champions/${champion._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/champions')
      })
    })
    .catch(err => {
    console.log(err)
    res.redirect('/champions')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/champions')
  })
}

function show(req, res) {
  Champion.findById(req.params.championId)
  .populate(['owner', 'roles'])
  .then(champion => {
    Role.find({_id: {$nin: champion.roles}})
    .then(roles => {
      res.render('champions/show', {
        champion,
        title: 'Show Champion',
        roles
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/champions')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/champions')
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
        res.redirect(`/champions/${champion._id}`)
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

function deleteChampion(req, res) {
  Champion.findById(req.params.championId)
  .then(champion => {
    if (champion.owner.equals(req.user.profile._id)) {
      champion.deleteOne()
      .then(() => {
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

function addToRoles(req, res) {
  Champion.findById(req.params.championId)
  .then(champion => {
    champion.roles.push(req.body.roleId)
    champion.save()
    .then(() => {
      res.redirect(`/champions/${champion._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/champions')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/champions')
  })
}

function removeFromRoles(req, res) {
  Champion.findById(req.params.championId)
  .then(champion => {
    champion.roles.remove(req.body.roleId)
    champion.save()
    .then(() => {
      res.redirect(`/champions/${champion._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/champions')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/champions')
  })
}

export {
  index,
  create,
  newChampion as new,
  show,
  edit,
  update,
  deleteChampion as delete,
  addToRoles,
  removeFromRoles,
}