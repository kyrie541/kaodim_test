import { NEXT_QUESTION, PREVIOUS_QUESTION, RESET_QUESTION} from "../actionTypes";

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const previousQuestion = () => ({
  type: PREVIOUS_QUESTION,
}); 

export const resetQuestion = () => ({
  type: RESET_QUESTION,
}); 




