import {NEXT_QUESTION, PREVIOUS_QUESTION, RESET_QUESTION} from "../actionTypes";

const QUESTION_STATE = {
  question_number: 0
};

export default (state= QUESTION_STATE ,action) => {
  switch (action.type){
    case NEXT_QUESTION:
      let nextNumber = state.question_number+1;
      return {...state, question_number: nextNumber};
    case PREVIOUS_QUESTION:
      let previousNumber = state.question_number-1;
      return {...state, question_number: previousNumber};
    case RESET_QUESTION:
      return {...state, question_number: 0};
    default:
     return state;
  }
};