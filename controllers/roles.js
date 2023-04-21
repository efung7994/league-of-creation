import { Role } from "../models/role.js"

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
    res.redirect(`/roles/${role._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/roles/new')
  })
}

export {
  index,
  create,
  newRole as new,
}