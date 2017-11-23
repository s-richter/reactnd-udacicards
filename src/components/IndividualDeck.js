import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
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
    buttonBase: {
        marginTop: 25,
        padding: 15,
        fontSize: 20,
        width: 200,
        color: white,
        borderRadius: 6
    },
    buttonAdd: {
        backgroundColor: blue,
        color: white,
    },
    buttonQuiz: {
        backgroundColor: black,
        color: white,
    }
})

class IndividualDeck extends Component {
    static navigationOptions = ({ navigation }) =>
        ({ title: navigation.state.params.deckTitle || 'Deck' })

    render() {
        const { deck, deckTitle, navigation, cardCountText, errorAddCard } = this.props
        const { navigate } = this.props.navigation

        return (
            <View style={styles.container}>
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
                        style={[styles.buttonBase, styles.buttonAdd]}
                        onPress={() => navigate('NewCard', { deckTitle })}
                    >
                        Add card
                    </TextButton>
                    {
                        deck.questions.length > 0 &&
                        <TextButton
                            style={[styles.buttonBase, styles.buttonQuiz]}
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

function mapStateToProps({ decks, errorAddCard }, { navigation }) {
    const { deckTitle } = navigation.state.params
    const deck = decks[deckTitle]
    const cardCountText = getCardCount(deck)
    return {
        deck,
        deckTitle,
        cardCountText,
        errorAddCard
    }
}

export default connect(mapStateToProps)(IndividualDeck)