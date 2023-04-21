import { Router } from 'express'
import * as rolesCtrl from '../controllers/roles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', rolesCtrl.index)
router.get('/new', isLoggedIn, rolesCtrl.new)
router.post('/', isLoggedIn, rolesCtrl.create)

export {
  router
}