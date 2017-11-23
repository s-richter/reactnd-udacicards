import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import getCardCount from '../utils'

const styles = StyleSheet.create({
    deckListItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    },
    deckTitle: {
        fontSize: 24,
    },
    deckCardCount: {
        fontSize: 16,
    },
})

// component that describes a single deck in the DeckList component
export default class DeckListItem extends Component {
    render() {
        const { item, onPress } = this.props
        const cardCountText = getCardCount(item) // gets pluralized string with the number of cards

        return (
            <TouchableOpacity
                onPress={() => onPress(item)}
            >
                <View style={styles.deckListItem}>
                    <Text style={styles.deckTitle}>{item.title}</Text>
                    <Text style={styles.deckCardCount}>{cardCountText}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
