import { UPDATE_DRAFT, CLEAR_DRAFT, OPEN_DRAFT } from "../actions/types";

import { Draft } from "../data/draft";


// Draft Reducer
export default (state = new Draft(), action) => {
  switch (action.type) {
    case UPDATE_DRAFT:
      return state.set(action.payload.field, action.payload.value);
    case CLEAR_DRAFT:
      return new Draft();
    case OPEN_DRAFT:
      return action.payload;
    default:
      return state;
  }
};
