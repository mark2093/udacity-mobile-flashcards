import { getDecks } from '../utils/api';

export const GET_A_NEW_DECK = 'GET_A_NEW_DECK';
export const ADD_A_NEW_DECK = 'ADD_A_NEW_DECK';
export const DELETE_A_DECK = 'DELETE_A_DECK';
export const ADD_A_NEW_CARD = 'ADD_A_NEW_CARD';
export const SHUFFLE_THE_DECK = 'SHUFFLE_THE_DECK';

export function getANewDeck(decks) {
  return {
    type: GET_A_NEW_DECK,
    decks
  };
}

export function addANewDeck(title) {
  return {
    type: ADD_A_NEW_DECK,
    title
  };
}

export function deleteADeck(id) {
  return {
    type: DELETE_A_DECK,
    id
  };
}

export function addANewCard(deckId, card) {
  return {
    type: ADD_A_NEW_CARD,
    deckId,
    card
  };
}

export function shuffleTheDeck() {
  return {
    type: SHUFFLE_THE_DECK
  };
}
export function handleInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(getANewDeck(decks));
    });
  };
}