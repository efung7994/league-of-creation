import { Router } from 'express'
import * as championsCtrl from '../controllers/champions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', championsCtrl.index)
router.get('/new', isLoggedIn, championsCtrl.new)
router.get('/:championId', championsCtrl.show)
router.get('/:championId/edit', isLoggedIn, championsCtrl.edit)
router.post('/', isLoggedIn, championsCtrl.create)
router.post('/:championId/roles', isLoggedIn, championsCtrl.addToRoles)
router.put('/:championId', isLoggedIn, championsCtrl.update)
router.delete('/:championId', isLoggedIn, championsCtrl.delete)
router.delete('/:championId/roles', isLoggedIn, championsCtrl.removeFromRoles)

export {
  router
}