import {
  GENERATE_QUESTIONS_START,
  GENERATE_QUESTIONS_SUCCESS
} from '../actions/question';

export default function question(state, action) {
  switch (action.type) {
    case GENERATE_QUESTIONS_START:
      return { ...state,
        loading: true
      }
    case GENERATE_QUESTIONS_SUCCESS:
      return { ...state,
        questions: action.payload,
        loading: false
      }
    default:
      return state || {
        questions: [],
        loading: false
      };
  }
}

