import * as CONSTANTS from './constants'

export const initialState = {
    decks: {},
    isFetching: false,
    errorLoadDecks: false,
    errorAddDeck: false,
    errorAddCard: false
}

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DECKS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case CONSTANTS.GET_DECKS_RESPONSE:
            return {
                ...state,
                decks: action.decks,
                isFetching: false,
                errorLoadDecks: false
            }
        case CONSTANTS.GET_DECKS_ERROR:
            return {
                ...state,
                isFetching: false,
                errorLoadDecks: true,
            }
        case CONSTANTS.SAVE_DECK_TITLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case CONSTANTS.SAVE_DECK_TITLE_RESPONSE: {
            return {
                ...state,
                isFetching: false,
                errorAddDeck: false,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title: action.title,
                        questions: []
                    }
                }
            }
        }
        case CONSTANTS.SAVE_DECK_TITLE_ERROR:
            return {
                ...state,
                isFetching: false,
                errorAddDeck: true,
                decks: {
                    ...state.decks
                }
            }
        case CONSTANTS.ADD_CARD_TO_DECK_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case CONSTANTS.ADD_CARD_TO_DECK_RESPONSE: {
            const result = {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title: action.title,
                        questions: state.decks[action.title]
                            ? state.decks[action.title].questions.concat({ ...action.card })
                            : [{ ...action.card }]
                    }
                },
                isFetching: false,
                errorAddCard: false
            }
            return result
        }
        case CONSTANTS.ADD_CARD_TO_DECK_ERROR: {
            return {
                ...state,
                isFetching: false,
                errorAddCard: true
            }
        }
        default:
            return state
    }
}