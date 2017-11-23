import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import TextButton from './TextButton'
import Progress from './Progress'
import { white, green, red } from '../utils/colors'
import QuizFinished from './QuizFinished'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    cardContainer: {
        flex: 1,
        marginTop: 36,
        alignItems: 'center'
    },
    cardText: {
        fontSize: 24,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    toggleCardSideButton: {
        fontSize: 24,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    correctButton: {
        backgroundColor: green,
    },
    incorrectButton: {
        backgroundColor: red,
    }
})

// component that enables the user to answer the questions in a deck
class Quiz extends Component {
    static navigationOptions = { title: 'Quiz' }

    state = {
        currentCardIndex: 0,
        correctSoFar: 0,
        incorrectSoFar: 0,
        quizIsFinished: false,
        showAnswer: false
    }

    resetQuiz = () => {
        this.setState({
            currentCardIndex: 0,
            correctSoFar: 0,
            incorrectSoFar: 0,
            quizIsFinished: false,
            showAnswer: false
        })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    toggleCardSide = () => {
        this.setState(state => ({ showAnswer: !state.showAnswer }))
    }

    markAsCorrect = () => {
        const { currentCardIndex, correctSoFar, quizIsFinished } = this.state
        const { deck } = this.props
        const deckQuestions = deck.questions
        if (currentCardIndex === deckQuestions.length - 1) {
            clearLocalNotification()
                .then(setLocalNotification())
            this.setState(prev => ({
                currentCardIndex: prev.currentCardIndex + 1,
                quizIsFinished: true,
                correctSoFar: prev.correctSoFar + 1
            }))
        } else {
            this.setState(prev => ({
                currentCardIndex: prev.currentCardIndex + 1,
                correctSoFar: prev.correctSoFar + 1,
                showAnswer: false
            }))
        }
    }

    markAsIncorrect = () => {
        const { currentCardIndex, incorrectSoFar, quizIsFinished } = this.state
        const { deck } = this.props
        const deckQuestions = deck.questions
        if (currentCardIndex === deckQuestions.length - 1) {
            clearLocalNotification()
                .then(setLocalNotification())
            this.setState(prev => ({
                currentCardIndex: prev.currentCardIndex + 1,
                quizIsFinished: true,
                incorrectSoFar: prev.incorrectSoFar + 1
            }))
        } else {
            this.setState(prev => ({
                currentCardIndex: prev.currentCardIndex + 1,
                incorrectSoFar: prev.incorrectSoFar + 1,
                showAnswer: false
            }))
        }
    }

    render() {
        const { currentCardIndex, correctSoFar, incorrectSoFar, quizIsFinished } = this.state
        if (quizIsFinished) {
            return (
                <QuizFinished
                    correct={correctSoFar}
                    incorrect={incorrectSoFar}
                    restartQuiz={this.resetQuiz}
                    goBack={this.goBack}
                />
            )
        } else {
            const { deck } = this.props
            const { question, answer } = deck.questions[currentCardIndex]
            return (
                <View style={styles.container}>
                    <Progress
                        answered={currentCardIndex}
                        total={deck.questions.length} />
                    <View style={styles.cardContainer}>
                        <Text style={styles.cardText}>
                            {
                                this.state.showAnswer ? answer : question
                            }
                        </Text>
                        <TextButton
                            style={styles.toggleCardSideButton}
                            onPress={this.toggleCardSide}
                        >
                            {this.state.showAnswer ? 'Show Question' : 'Show Answer'}
                        </TextButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TextButton
                            style={styles.correctButton}
                            onPress={() => this.markAsCorrect()}
                        >
                            Correct
                        </TextButton>
                        <TextButton
                            style={styles.incorrectButton}
                            onPress={() => this.markAsIncorrect()}
                        >
                            Incorrect
                        </TextButton>
                    </View>
                </View>
            )
        }
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params
    const deck = state.decks[deckTitle]
    return {
        deck
    }
}

export default connect(mapStateToProps)(Quiz)
