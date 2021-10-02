const Ranking = require('../models/ranking.model');

const RankingController = {
  create: async (req, res) => {
    const { userId, username, topicId, score, time } = req.body;

    const newRanking = { userId, username, topicId, score, time };
    try {
      const ranking = await Ranking.create(newRanking);
      res.status(200).json({
        ranking,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getListTop: async (req, res) => {
    const topicId = req.params;
    try {
      console.log(topicId);
      const rankingList = await Ranking.find({
        topicId: topicId.topicId,
      })
        .sort({
          score: -1,
        })
        .limit(10);

      res.status(200).json({
        rankingList,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = RankingController;
