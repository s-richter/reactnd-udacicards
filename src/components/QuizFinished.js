import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TextButton from './TextButton'
import { white, green, red } from '../utils/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    infoContainer: {
        flex: 1,
        marginTop: 36,
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
    },
    label: {
        marginTop: 25,
        fontSize: 24,
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
    restartButton: {
        backgroundColor: green,
    },
    backButton: {
        backgroundColor: red,
    }
})

// shows the user the score he or she has received in the quiz
export default class QuizFinished extends Component {
    render() {
        const { correct, incorrect, restartQuiz, goBack } = this.props
        const result = Math.round((correct / (correct + incorrect)) * 100, 2)
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.header}>You finished the quiz!</Text>
                    <Text style={styles.label}>Correct answers: {correct}</Text>
                    <Text style={styles.label}>Incorrect answers: {incorrect}</Text>
                    <Text style={styles.label}>You scored {result}%!</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextButton 
                        style={[styles.buttonBase, styles.restartButton]} 
                        onPress={() => restartQuiz()}>
                        Restart quiz
                    </TextButton>
                    <TextButton
                        style={[styles.buttonBase, styles.backButton]}
                        onPress={() => goBack()}
                    >
                        Back
                    </TextButton>
                </View>
            </View>
        )
    }
}
