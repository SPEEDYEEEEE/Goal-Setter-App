const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel')

//desc    Get goals
//route   Get/api/goals
//access  Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id});
    res.status(200).json(goals);
});

//desc    Set goals
//route   Post/api/goals
//access  Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text field');
        //.json({message: 'please add text field'})
    };
    const goals = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goals);
});

//desc    Update goals
//route   Put/api/goals
//access  Private
const updateGoal = asyncHandler(async(req, res) => {
    const goals = await Goal.findById(req.params.id)
    if (!goals){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //logged in user matches the goal user
    if (goals.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
});

//desc    Delete goals
//route   delete/api/goals
//access  Private
const deleteGoal = asyncHandler(async(req, res) => {
    const result = await Goal.findByIdAndDelete(req.params.id);
    if (!result){
        res.status(400);
        throw new Error('Goal not found');
    }
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //logged in user matches the goal user
    if (result.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    res.status(200).json({id: req.params.id, message: 'Goal deleted successfully',});
});


module.exports = {getGoals, setGoal, updateGoal, deleteGoal};