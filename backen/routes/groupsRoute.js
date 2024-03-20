const express = require('express');
const router = express.Router();
const { addGroup, deleteGroup, getAllGroups } = require('../controller/groupsController');

// @route   POST /groups
// @desc    Add a new group
// @access  Public
router.post('/', addGroup);

// @route   DELETE /groups/:id
// @desc    Delete a group
// @access  Public
router.delete('/:id', deleteGroup);

// @route   GET /groups
// @desc    Get all groups
// @access  Public
router.get('/', getAllGroups);

module.exports = router;
