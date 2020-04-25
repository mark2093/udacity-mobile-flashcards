import {
    GET_A_NEW_DECK,
    ADD_A_NEW_DECK,
    DELETE_A_DECK,
    ADD_A_NEW_CARD,
    SHUFFLE_THE_DECK
  } from '../actions/index';
  import { decks as PRIMARY_STATE } from '../utils/_DATA';
  
  export default function decks(state = {}, action) {
    switch (action.type) {
      case GET_A_NEW_DECK:
        return {
          ...state,
          ...action.decks
        };
      case ADD_A_NEW_DECK:
        const { title } = action;
        return {
          ...state,
          [title]: {
            title,
            questions: []
          }
        };
      case DELETE_A_DECK:
        const { id } = action;
        const { [id]: value, ...decksRemaining } = state;
        return decksRemaining;
      case ADD_A_NEW_CARD:
        const { deckId, card } = action;
        return {
          ...state,
          [deckId]: {
            ...state[deckId],
            questions: [...state[deckId].questions].concat(card)
          }
        };
      case SHUFFLE_THE_DECK:
        return PRIMARY_STATE;
      default:
        return state;
    }
  }