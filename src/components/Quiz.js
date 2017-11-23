import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import TextButton from './TextButton'
import Progress from './Progress'
import { blue, white, green, red } from '../utils/colors'
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
        color: blue
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

    gradeAnswer = (answerIsCorrect) => {
        const { currentCardIndex, correctSoFar, quizIsFinished } = this.state
        const { deck } = this.props
        const deckQuestions = deck.questions
        let nowCorrect = this.state.correctSoFar + (answerIsCorrect ? 1 : 0)
        let nowIncorrect = this.state.incorrectSoFar + (answerIsCorrect ? 0 : 1)
        if (currentCardIndex === deckQuestions.length - 1) {
            clearLocalNotification()
                .then(setLocalNotification())
            this.setState(prev => ({
                currentCardIndex: prev.currentCardIndex + 1,
                correctSoFar: nowCorrect,
                incorrectSoFar: nowIncorrect,
                quizIsFinished: true,
            }))
        } else {
            this.setState(prev => ({
                currentCardIndex: prev.currentCardIndex + 1,
                correctSoFar: nowCorrect,
                incorrectSoFar: nowIncorrect,
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
                            onPress={() => this.gradeAnswer(true)}
                        >
                            Correct
                        </TextButton>
                        <TextButton
                            style={styles.incorrectButton}
                            onPress={() => this.gradeAnswer(false)}
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
