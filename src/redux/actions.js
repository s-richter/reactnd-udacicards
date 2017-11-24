import * as ACTIONS from './actiontypes'
import { ASYNC_STORAGE_KEY } from './constants'
import { AsyncStorage } from 'react-native'

function requestDecks() {
    return {
        type: ACTIONS.GET_DECKS_REQUEST
    }
}

function receiveDecks(decks) {
    return {
        type: ACTIONS.GET_DECKS_RESPONSE,
        decks
    }
}

function errorReceiveDecks() {
    return {
        type: ACTIONS.GET_DECKS_ERROR
    }
}

// gets the decks stored in local storage
export function getDecks() {
    return function (dispatch) {
        dispatch(requestDecks())
        AsyncStorage.getItem(ASYNC_STORAGE_KEY)
            .then((decks) => {
                const result = decks ? JSON.parse(decks) : {}
                dispatch(receiveDecks(result))
            })
            .catch((error) => {
                dispatch(errorReceiveDecks())
                console.log(error)
                return null
            })
    }
}

function requestSaveDeckTitle(title) {
    return {
        type: ACTIONS.SAVE_DECK_TITLE_REQUEST,
        title
    }
}

function receiveSaveDeckTitle(title) {
    return {
        type: ACTIONS.SAVE_DECK_TITLE_RESPONSE,
        title
    }
}

function errorSaveDeckTitle(title) {
    return {
        type: ACTIONS.SAVE_DECK_TITLE_ERROR,
        title
    }
}

// saves the title of a new deck in local storage
export function saveDeckTitle(title) {
    return (dispatch) => {
        dispatch(requestSaveDeckTitle(title))
        AsyncStorage.mergeItem(
            ASYNC_STORAGE_KEY,
            JSON.stringify(
                {
                    [title]: {
                        title,
                        questions: []
                    }
                }
            ))
            .then((done) => {
                dispatch(receiveSaveDeckTitle(title))
            })
            .catch((error) => {
                dispatch(errorSaveDeckTitle(title))
                console.log(error)
                return null
            })
    }
}

function requestAddCardToDeck(title, card) {
    return {
        type: ACTIONS.ADD_CARD_TO_DECK_REQUEST,
        title,
        card
    }
}

function receiveAddCardToDeck(title, card) {
    return {
        type: ACTIONS.ADD_CARD_TO_DECK_RESPONSE,
        title,
        card
    }
}

function errorAddCardToDeck(title, card) {
    return {
        type: ACTIONS.ADD_CARD_TO_DECK_ERROR,
        title,
        card
    }
}

// adds a new question to the deck specified by its title
export function addCardToDeck(title, card) {
    return (dispatch) => {
        dispatch(requestAddCardToDeck(title, card))
        AsyncStorage
            .getItem(ASYNC_STORAGE_KEY)
            .then((result) => {
                const decks = JSON.parse(result)
                const deck = decks[title]
                // get the existing cards of this deck and add the new one
                const deckCards = {
                    title,
                    questions: deck.questions.concat(card)
                }
                // store the result
                return AsyncStorage.mergeItem(
                    ASYNC_STORAGE_KEY,
                    JSON.stringify(
                        {
                            [title]: deckCards
                        }
                    ))
                    .then(
                        result =>
                            dispatch(receiveAddCardToDeck(title, card)),
                        error => {
                            dispatch(errorAddCardToDeck(title, card))
                            console.log(error)
                            return null
                        }
                    )
                    .catch(error => {
                        dispatch(errorAddCardToDeck(title, card))
                        console.log(error)
                        return null
                    }
                    )
            })
            .catch(error => {
                dispatch(errorAddCardToDeck(title, card))
                console.log(error)
                return null
            })
    }
}