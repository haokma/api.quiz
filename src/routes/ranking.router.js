const express = require('express');
const RankingController = require('../controllers/ranking.controller');

const router = express.Router();

router.post('/', RankingController.create);
router.get('/:topicId', RankingController.getListTop);

module.exports = router;
