const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const Pagination = require('../helpers/pagination');

const QuestionController = {
  create: async (req, res) => {
    const { name, topicId, answers, status } = req.body;
    const newQuestion = {
      name,
      topicId,
      answers,
      status,
    };
    try {
      const question = await Question.create(newQuestion);

      const newAnswer = {
        questionId: question._id,
        answers,
      };

      const answer = await Answer.create(newAnswer);
      question.answers = answer;

      res.status(200).json({
        question,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getList: async (req, res) => {
    let { page, limit, order, orderBy, name_like, topicId } = req.query;
    let skip, sort, query;
    try {
      name_like = name_like || '';
      page = Pagination.page(+page);
      limit = Pagination.limit(+limit);
      skip = Pagination.skip(+page, +limit);
      sort = Pagination.sort(order, orderBy);

      query = {
        name: { $regex: name_like },
      };
      if (topicId) {
        query.topicId = topicId;
      }

      const questionList = await Question.find(query).sort(sort).skip(skip).limit(limit);
      const total = await Question.find(query).count();

      res.status(200).json({
        questionList,
        pagination: Pagination.result(limit, page, total),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  delete: async (req, res) => {
    const questionId = req.body;
    try {
      //  Renove Array Category
      const question = await Question.deleteMany({
        _id: { $in: questionId },
      });

      res.status(200).json({
        question,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
};

module.exports = QuestionController;
