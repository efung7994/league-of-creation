import { Router } from 'express'
import * as championsCtrl from '../controllers/champions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', championsCtrl.index)
router.get('/new', championsCtrl.new)
router.post('/', isLoggedIn, championsCtrl.create)

export {
  router
}