const express = require('express')
const router = express.Router()
const allTaskRoutes = require('./allTaskRoutes')
const errorHandler = require('../middlewares/errorHandler')
const Controller = require('../controllers/controller')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/loginGoogle', Controller.loginGoogle)

router.use('/tasks',allTaskRoutes)

router.use(errorHandler)

module.exports = router