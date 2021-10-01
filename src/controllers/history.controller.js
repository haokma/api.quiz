const History = require('../models/history.model');

const HistoryController = {
  create: async (req, res) => {
    const {
      timespan,
      topicId,
      answers,
      userId,
      isSubmit,
      totalComplete,
      totalEmpty,
      totalError,
      totalSuccess,
      score,
    } = req.body;
    const newHistory = {
      timespan,
      topicId,
      answers,
      userId,
      isSubmit,
      totalComplete,
      totalEmpty,
      totalError,
      totalSuccess,
      score,
    };
    try {
      const history = await History.create(newHistory);

      res.status(200).json({
        history,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  get: async (req, res) => {
    let { topicId, userId } = req.query;

    try {
      const historyList = await History.find().sort({ createdAt: -1 }).limit(1);
      res.status(200).json({
        history: historyList[0],
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = HistoryController;
