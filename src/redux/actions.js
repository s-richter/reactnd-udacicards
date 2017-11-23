import * as CONSTANTS from './constants'
import { AsyncStorage } from 'react-native'

function requestDecks() {
    return {
        type: CONSTANTS.GET_DECKS_REQUEST
    }
}

function receiveDecks(decks) {
    return {
        type: CONSTANTS.GET_DECKS_RESPONSE,
        decks
    }
}

function errorReceiveDecks() {
    return {
        type: CONSTANTS.GET_DECKS_ERROR
    }
}

export function getDecks() {
    return function (dispatch) {
        dispatch(requestDecks())
        AsyncStorage.getItem(CONSTANTS.ASYNC_STORAGE_KEY)
            .then((decks) => {
                const result = decks ? JSON.parse(decks) : {}
                dispatch(receiveDecks(result))
            })
            .catch((error) => {
                console.log(error)
                return null
            })
    }
}

function requestSaveDeckTitle(title) {
    return {
        type: CONSTANTS.SAVE_DECK_TITLE_REQUEST,
        title
    }
}

function receiveSaveDeckTitle(title) {
    return {
        type: CONSTANTS.SAVE_DECK_TITLE_RESPONSE,
        title
    }
}

export function saveDeckTitle(title) {
    return (dispatch) => {
        dispatch(requestSaveDeckTitle(title))
        AsyncStorage.mergeItem(
            CONSTANTS.ASYNC_STORAGE_KEY,
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
                console.log(error)
                return null
            })
    }
}

function requestAddCardToDeck(title, card) {
    return {
        type: CONSTANTS.ADD_CARD_TO_DECK_REQUEST,
        title,
        card
    }
}

function receiveAddCardToDeck(title, card) {
    return {
        type: CONSTANTS.ADD_CARD_TO_DECK_RESPONSE,
        title,
        card
    }
}

export function addCardToDeck(title, card) {
    return (dispatch) => {
        dispatch(requestAddCardToDeck(title, card))
        AsyncStorage
            .getItem(CONSTANTS.ASYNC_STORAGE_KEY)
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
                    CONSTANTS.ASYNC_STORAGE_KEY,
                    JSON.stringify(
                        {
                            [title]: deckCards
                        }
                    ))
                    .then(
                        result => dispatch(receiveAddCardToDeck(title, card)),
                        error => {
                            console.log(error)
                            return null
                        }
                    )
                    .catch(
                        error => {
                            console.log(error)
                            return null
                        }
                    )
            })
            .catch((error) => {
                console.log(error)
                return null
            })
    }
}