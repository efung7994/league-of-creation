import { Router } from 'express'
import * as championsCtrl from '../controllers/champions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/tacos
router.get('/', championsCtrl.index)

export {
  router
}