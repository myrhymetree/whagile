import { UPDATE_CARD, DELETE_CARD } from "./types";
import { UPDATE_DRAFT, CLEAR_DRAFT, OPEN_DRAFT } from "./types";
import { OPEN_ADD_CARD_MODAL, CLOSE_ADD_CARD_MODAL } from "./types";

// Card Actions
export const updateCard = (card) => ({
  type: UPDATE_CARD,
  payload: card,
});

export const deleteCard = (id) => ({
  type: DELETE_CARD,
  payload: id,
});

// Draft Actions
export const updateDraft = (field, value) => ({
  type: UPDATE_DRAFT,
  payload: {
    field,
    value,
  },
});

export const clearDraft = () => ({
  type: CLEAR_DRAFT,
});

export const openDraft = (card) => ({
  type: OPEN_DRAFT,
  payload: card,
});

// Modal Actions
export const openAddCardModal = () => ({
  type: OPEN_ADD_CARD_MODAL,
  payload: true,
});

export const closeAddCardModal = () => ({
  type: CLOSE_ADD_CARD_MODAL,
  payload: false,
});
