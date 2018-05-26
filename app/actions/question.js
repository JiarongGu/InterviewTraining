import { QuestionService } from '../services';

export const GENERATE_QUESTIONS_START = 'GENERATE_QUESTIONS_START';
export const GENERATE_QUESTIONS_SUCCESS = 'GENERATE_QUESTIONS_SUCCESS';

export function genrateQuestionsStart() {
  return {
    type: GENERATE_QUESTIONS_START
  };
}

export function genrateQuestionsSuccess(questions) {
  return {
    type: GENERATE_QUESTIONS_SUCCESS,
    payload: questions
  };
}

export function generateQuestions(size) {
  return dispatch => {
    const questionService = new QuestionService();

    dispatch(genrateQuestionsStart());
    dispatch(genrateQuestionsSuccess(questionService.getRandom(size)));
  };
}
