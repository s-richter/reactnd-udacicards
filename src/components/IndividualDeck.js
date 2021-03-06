import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import TextButton from './TextButton'
import { blue, white, black, red } from '../utils/colors'
import getCardCount from '../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    error: {
        marginTop: 36,
        marginBottom: 24,
        width: '90%',
        alignSelf: 'center',
        fontSize: 24,
        color: `${red}`
    },
    titleContainer: {
        flex: 1,
        marginTop: 36,
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 24,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    deckCardCount: {
        fontSize: 16,
    },
    buttonAdd: {
        backgroundColor: blue
    },
    buttonQuiz: {
        backgroundColor: black
    }
})

// a single deck enabling the user to add cards to it or start a quiz
class IndividualDeck extends Component {
    static navigationOptions = ({ navigation }) =>
        ({ title: navigation.state.params.deckTitle })

    render() {
        const {
            deck,
            deckTitle,
            navigation,
            cardCountText,
            errorAddCard,
            errorAddDeck,
            isFetching
        } = this.props
        const { navigate } = this.props.navigation

        return (
            isFetching
                ? <ActivityIndicator />
                : <View style={styles.container}>
                    {
                        errorAddDeck && <Text style={styles.error}>
                            There was an error adding the deck.
                        </Text>
                    }
                    {
                        errorAddCard && <Text style={styles.error}>
                            There was an error adding the card.
                        </Text>
                    }
                    <View style={styles.titleContainer}>
                        <Text style={styles.deckTitle}>{deckTitle}</Text>
                        <Text style={styles.deckCardCount}>{cardCountText}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TextButton
                            style={styles.buttonAdd}
                            onPress={() => navigate('NewCard', { deckTitle })}
                        >
                            Add card
                        </TextButton>
                        {
                            deck.questions.length > 0 &&
                                <TextButton
                                    style={styles.buttonQuiz}
                                    onPress={() => navigate('Quiz', { deckTitle })}
                                >
                                    Start Quiz
                                </TextButton>
                        }
                    </View>
                </View>
        )
    }
}

function mapStateToProps({ decks, errorAddCard, errorAddDeck }, { navigation }) {
    const { deckTitle } = navigation.state.params
    const deck = decks[deckTitle]
    if (!deck) { // happens after adding a new deck and the store has not yet been updated
        return {
            deck: {},
            deckTitle,
            cardCountText: '',
            errorAddCard,
            errorAddDeck,
            isFetching: true
        }
    }
    const cardCountText = getCardCount(deck) // gets pluralized string with the number of cards
    return {
        deck,
        deckTitle,
        cardCountText,
        errorAddCard,
        errorAddDeck,
        isFetching: false
    }
}

export default connect(mapStateToProps)(IndividualDeck)