const answersSuccess = (questions, data) => {
  let totalSuccess = 0;
  if (!data || !questions) return totalSuccess;
  data.forEach((item, index) => {
    if (item === (null || undefined || -1)) return;
    const result = questions[index].answers[item];
    if (result.isCorrect) {
      totalSuccess++;
    }
  });
  return totalSuccess;
};

const answersError = (questions, data) => {
  let totalError = 0;
  if (!data || !questions) return totalError;
  data.forEach((item, index) => {
    if (item === (null || undefined || -1)) return;
    const result = questions[index].answers[item];
    if (!result.isCorrect) {
      totalError++;
    }
  });
  return totalError;
};

const answersEmpty = (totalSucess, totalError, questions) => {
  return questions.length - totalSucess - totalError;
};

const calceScore = (totalSucces, question) => {
  return Math.ceil((10 / question.length) * totalSucces);
};

const checkAnswersList = (questions, data) => {
  const newAnswers = [...data];
  data.forEach((item, index) => {
    if (item === (null || undefined || -1)) return;
    const result = questions[index].answers[item];
    if (!result.isCorrect) {
      newAnswers[index] = 0;
    } else {
      newAnswers[index] = 1;
    }
  });
  return newAnswers;
};

module.exports = {
  checkAnswersList,
  calceScore,
  answersEmpty,
  answersError,
  answersSuccess,
};
