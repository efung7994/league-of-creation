import { Role } from "../models/role.js"
import { Profile } from '../models/profile.js'

function index(req, res) {
  Role.find({})
  .populate('owner')
  .then(roles => {
    console.log(roles);
    res.render('roles/index', {
      roles,
      title: "Roles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newRole(req, res) {
  res.render('roles/new', {
    title: 'Add Role'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Role.create(req.body)
  .then(role => {
    Profile.findById(req.user.profile)
    .then(profile => {
      profile.roles.push(role)
      profile.save()
      .then(()=> {
        res.redirect(`/roles/${role._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/roles')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/roles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/roles/new')
  })
}

function show(req, res) {
  Role.findById(req.params.roleId)
  .populate('owner')
  .then(role => {
    res.render('roles/show', {
      role,
      title: 'Show Role'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Role.findById(req.params.roleId)
  .then(role => {
    res.render('roles/edit', {
      role,
      title: "Edit role"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Role.findById(req.params.roleId)
  .then(role => {
    if (role.owner.equals(req.user.profile._id)) {
      role.updateOne(req.body)
      .then(()=> {
        res.redirect('/roles')
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

function deleteRole(req, res) {
  Role.findById(req.params.roleId)
  .then(role => {
    if (role.owner.equals(req.user.profile._id)) {
      role.deleteOne()
      .then(() => {
        res.redirect('/roles')
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
  newRole as new,
  show,
  edit,
  update,
  deleteRole as delete,
}