const express = require('express');
const router = express.Router();
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

//Read
router.get('/', protect, getGoals);
//Create
router.post('/', protect, setGoal);
//Update
router.put('/:id', protect, updateGoal);
//Delete
router.delete('/:id', protect, deleteGoal);

module.exports = router;