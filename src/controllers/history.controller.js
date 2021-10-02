const {
  answersSuccess,
  answersError,
  calceScore,
  answersEmpty,
  checkAnswersList,
} = require('../helpers/findAnswers');
const History = require('../models/history.model');
const Question = require('../models/question.model');
const Topic = require('../models/topic.model');
const HistoryController = {
  create: async (req, res) => {
    const { timespan, topicId, answers, userId, isSubmit } = req.body;

    try {
      const questions = await Question.find({
        topicId,
      });

      const totalSuccess = answersSuccess(questions, answers);
      const totalError = answersError(questions, answers);
      const totalEmpty = answersEmpty(totalSuccess, totalError, questions);
      const score = calceScore(totalSuccess, questions);
      const totalComplete = totalSuccess + totalError;
      const answersResult = checkAnswersList(questions, answers);
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
        questions,
        answersResult,
      };
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
      const historyList = await History.find({
        topicId,
        userId,
      })
        .sort({ createdAt: -1 })
        .limit(1);
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
