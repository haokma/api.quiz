const express = require('express');
const QuestionController = require('../controllers/question.controller');

const router = express.Router();

router.post('/', QuestionController.create);
router.get('/', QuestionController.getList);
router.patch('/', QuestionController.delete);

module.exports = router;
