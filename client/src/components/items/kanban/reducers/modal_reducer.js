import { OPEN_ADD_CARD_MODAL, CLOSE_ADD_CARD_MODAL } from "../actions/types";

const INITIAL_STATE = {
  addCardModalIsOpen: false,
};

// Modal Reducer
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_ADD_CARD_MODAL:
      return { addCardModalIsOpen: action.payload };
    case CLOSE_ADD_CARD_MODAL:
      return { addCardModalIsOpen: action.payload };
    default:
      return state;
  }
};
