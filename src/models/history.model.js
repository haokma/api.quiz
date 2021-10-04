const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = Schema(
  {
    isSubmit: { type: Boolean, default: false },
    topicId: { type: Schema.Types.ObjectId, require },
    userId: { type: Schema.Types.ObjectId, require },
    answers: { type: Array, default: [] },
    timespan: { type: Number, require },
    totalError: { type: Number, default: 0 },
    totalSuccess: { type: Number, default: 0 },
    totalEmpty: { type: Number, default: 0 },
    totalComplete: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    questions: { type: Array, default: [] },
    answersResult: { type: Array, default: [] },
    username: { type: String, require },
    topicName: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model('history', historySchema, 'history');

module.exports = History;
