const {
  answersSuccess,
  answersError,
  calceScore,
  answersEmpty,
  checkAnswersList,
} = require('../helpers/findAnswers');
const Pagination = require('../helpers/pagination');
const History = require('../models/history.model');
const Question = require('../models/question.model');
const HistoryController = {
  create: async (req, res) => {
    const { timespan, topicId, answers, userId, isSubmit, username, topicName } = req.body;
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
        username,
        topicName,
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
  getListByUser: async (req, res) => {
    let { page, limit, name_like, userId, topicId } = req.query;
    let skip, sort, query;
    try {
      name_like = name_like || '';
      page = Pagination.page(+page);
      limit = Pagination.limit(+limit);
      skip = Pagination.skip(+page, +limit);
      query = {
        userId,
        topicId,
      };
      console.log(userId, topicId);
      if (!topicId) {
        delete query.topicId;
      }

      const historyList = await History.find(query, {
        timespan: 0,
        answers: 0,
        answersResult: 0,
        answersResult: 0,
        questions: 0,
      })
        .sort(sort)
        .skip(skip)
        .limit(limit);
      const total = await History.find(query).count();

      res.status(200).json({
        historyList,
        pagination: Pagination.result(limit, page, total),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = HistoryController;
