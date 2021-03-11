const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const {authenticate, authorize} = require('../middlewares/auth')

router.use(authenticate)
router.get('/', Controller.getAllTasks)
router.post('/', Controller.addTask)
router.get('/category', Controller.getCategoryName)

router.use('/:id', authorize)
router.get('/:id', Controller.getTask)
router.put('/:id', Controller.editTask)
// router.patch('/:id', Controller.changeCategory)
router.delete('/:id', Controller.deleteTask)

module.exports = router