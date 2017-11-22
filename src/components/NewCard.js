import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import TextButton from './TextButton'
import { addCardToDeck } from '../redux/actions'
import { gray, blue, white, black } from '../utils/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    inputsContainer: {
        flex: 1,
        marginTop: 36,
        alignItems: 'center'
    },
    label: {
        marginBottom: 25,
        fontSize: 24,
    },
    questionInput: {
        marginBottom: 35,
        height: 48,
        width: '90%',
        fontSize: 16,
        borderColor: gray,
        borderWidth: 0.5,
        borderRadius: 5
    },
    answerInput: {
        height: 48,
        width: '90%',
        fontSize: 16,
        borderColor: gray,
        borderWidth: 0.5,
        borderRadius: 5
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    buttonBase: {
        marginTop: 25,
        padding: 15,
        fontSize: 20,
        width: 200,
        color: white,
        borderRadius: 6
    },
    submitButton: {
        backgroundColor: blue,
    },
    cancelButton: {
        backgroundColor: black,
    }
})

class NewCard extends Component {
    static navigationOptions = { title: "Add a new question" }

    state = {
        question: '',
        answer: ''
    }

    onChangeQuestion = (value) => {
        this.setState({ question: value })
    }

    onChangeAnswer = (value) => {
        this.setState({ answer: value })
    }

    onSubmit = async () => {
        const { addCardToDeck, navigation, deck } = this.props
        const { deckTitle } = navigation.state.params
        const { question, answer } = this.state
        if (!question) {
            Alert.alert("Warning", "The question text may not be empty!");
            return;
        }
        const questionsArray = deck.questions.map(card => card.question)
        if (questionsArray.includes(question)) {
            Alert.alert("Warning", "This question was already created!");
            return;
        }
        if (!answer) {
            Alert.alert("Warning", "The answer text may not be empty!");
            return;
        }
        addCardToDeck(deckTitle, this.state)
        navigation.goBack()
    }

    onCancel = async () => {
        this.setState({
            question: '',
            answer: ''
        })
        this.props.navigation.goBack()
    }

    render() {
        const { question, answer } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>
                        Question (Front):
                    </Text>
                    <TextInput
                        style={styles.questionInput}
                        value={question}
                        onChangeText={(value) => this.onChangeQuestion(value)}
                        placeholder="Please enter a question" />
                    <Text style={styles.label}>
                        Answer (Back):
                    </Text>
                    <TextInput
                        style={styles.answerInput}
                        value={answer}
                        onChangeText={(value) => this.onChangeAnswer(value)}
                        placeholder="Please enter the answer" />
                </View>
                <View style={styles.buttonContainer}>
                    <TextButton
                        style={[styles.buttonBase, styles.submitButton]}
                        onPress={this.onSubmit}
                    >
                        Submit
                    </TextButton>
                    <TextButton
                        style={[styles.buttonBase, styles.cancelButton]}
                        onPress={this.onCancel}
                    >
                        Cancel
              </TextButton>
                </View>
            </View>
        )
    }
}

function mapStateToProps({ decks }, { navigation }) {
    const { deckTitle } = navigation.state.params
    const deck = decks[deckTitle]
    return {
        deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCardToDeck: (deckTitle, card) => { dispatch(addCardToDeck(deckTitle, card)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
