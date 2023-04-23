import { Router } from 'express'
import * as rolesCtrl from '../controllers/roles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', rolesCtrl.index)
router.get('/new', isLoggedIn, rolesCtrl.new)
router.get('/:roleId', rolesCtrl.show)
router.get('/:roleId/edit', isLoggedIn, rolesCtrl.edit)
router.put('/:roleId', isLoggedIn, rolesCtrl.update)
router.post('/', isLoggedIn, rolesCtrl.create)
router.delete('/:roleId', isLoggedIn, rolesCtrl.delete)

export {
  router
}