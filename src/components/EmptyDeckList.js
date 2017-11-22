import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { blue, white } from '../utils/colors'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    message: {
        marginTop: 36,
        fontSize: 24,
        width: '90%'
    },
    button: {
        marginTop: 25,
        padding: 15,
        fontSize: 20,
        width: 200,
        backgroundColor: blue,
        color: white,
        borderRadius: 6
    }
})

function EmptyDeckList(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                There are no decks available right now. You can create one below.
                </Text>
            <TextButton
                style={styles.button}
                onPress={() => props.navigation.navigate("NewDeck")}>
                Add Deck
                </TextButton>
        </View>
    )
}

export default EmptyDeckList