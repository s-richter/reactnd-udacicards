import * as CONSTANTS from './constants'

export const initialState = {
    decks: {},
    isFetching: false,
    error: false
    // decks: {
    //     React: {
    //         title: 'React',
    //         questions: [
    //           {
    //             question: 'What is React?',
    //             answer: 'A library for managing user interfaces'
    //           },
    //           {
    //             question: 'Where do you make Ajax requests in React?',
    //             answer: 'The componentDidMount lifecycle event'
    //           }
    //         ]
    //       },
    //       JavaScript: {
    //         title: 'JavaScript',
    //         questions: [
    //           {
    //             question: 'What is a closure?',
    //             answer: 'The combination of a function and the lexical environment within which that function was declared.'
    //           }
    //         ]
    //       },
    //       test123: {
    //         title: 'test123',
    //         questions: [
    //           {
    //             question: 'question1',
    //             answer: 'answer1'
    //           }
    //         ]
    //       }
    // }
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
                error: false
            }
        case CONSTANTS.GET_DECKS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case CONSTANTS.SAVE_DECK_TITLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case CONSTANTS.SAVE_DECK_TITLE_RESPONSE: {
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title: action.title,
                        questions: []
                    }
                }
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
                isFetching: false
            }
            return result
        }
        default:
            return state
    }
}