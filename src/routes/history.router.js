const express = require('express');
const HistoryController = require('../controllers/history.controller');

const router = express.Router();

router.post('/', HistoryController.create);
router.get('/', HistoryController.get);
router.get('/getByUser', HistoryController.getListByUser);

module.exports = router;
