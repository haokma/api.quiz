const express = require('express');
const authRouter = require('./user.router');
const categoryRouter = require('./category.router');
const topicRouter = require('./topic.router');
const questionRouter = require('./question.router');
const rankingRouter = require('./ranking.router');
const historyRouter = require('./history.router');

const apiRoute = express();

apiRoute.use('/auth', authRouter);
apiRoute.use('/category', categoryRouter);
apiRoute.use('/topic', topicRouter);
apiRoute.use('/question', questionRouter);
apiRoute.use('/ranking', rankingRouter);
apiRoute.use('/history', historyRouter);

module.exports = apiRoute;
