import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import { navigation } from 'react-navigation'
import TextButton from './TextButton'
import { saveDeckTitle } from '../redux/actions'
import { gray, blue, white } from '../utils/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    deckTitle: {
        marginTop: 36,
        fontSize: 24,
        textAlign: 'center'
    },
    deckInput: {
        marginTop: 25,
        height: 48,
        width: '90%',
        fontSize: 16,
        borderColor: gray,
        borderWidth: 0.5,
        borderRadius: 5
    },
    submitButton: {
        backgroundColor: blue
    }
})

// component that allows the user to add a new deck
class NewDeck extends Component {
    state = {
        title: ''
    }

    onChange = (value) => {
        this.setState({ title: value })
    }

    onSave = () => {
        const { title } = this.state

        // validation
        if (!title) {
            Alert.alert("Warning", "The deck title may not be empty!");
            return;
        }
        if (this.props.decks[title]) {
            Alert.alert("Warning", "There is already a deck with that name!");
            return;
        }

        // save, reset and return
        this.props.saveDeckTitle(title)
        this.setState({ title: '' })
        this.props.navigation.navigate('IndividualDeck', { deckTitle: title })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.deckInput}
                    value={this.state.title}
                    onChangeText={(value) => this.onChange(value)}
                    placeholder="Please enter a deck title" />
                <TextButton
                    style={styles.submitButton}
                    onPress={this.onSave}
                >
                    Submit
                </TextButton>
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        decks: state.decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveDeckTitle: title => { dispatch(saveDeckTitle(title)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
