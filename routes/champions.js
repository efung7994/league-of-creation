import { Router } from 'express'
import * as championsCtrl from '../controllers/champions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', championsCtrl.index)
router.get('/new', isLoggedIn, championsCtrl.new)
router.get('/:championId', championsCtrl.show)
router.post('/', isLoggedIn, championsCtrl.create)

export {
  router
}