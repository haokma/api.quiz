const mongoose = require('mongoose');

const { Schema } = mongoose;

const rankingSchema = Schema(
  {
    time: { type: Number, require },
    userId: Schema.Types.ObjectId,
    username: { type: String, require },
    score: { type: Number, require },
    topicId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Ranking = mongoose.model('ranking', rankingSchema, 'ranking');

module.exports = Ranking;
