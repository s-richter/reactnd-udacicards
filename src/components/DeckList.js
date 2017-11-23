import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'
import { Constants } from 'expo'
import { getDecks } from '../redux/actions'
import { gray } from '../utils/colors'
import EmptyDeckList from './EmptyDeckList'
import DeckListItem from './DeckListItem'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    separator: {
        height: 1,
        backgroundColor: `${gray}`,
        width: '90%',
        alignSelf: 'center'
    },
    error: {
        marginTop: 36,
        width: '90%',
        alignSelf: 'center',
        fontSize: 24
    }
})

class DeckList extends Component {
    constructor() {
        super()
        DeckList.dataWasFetched = false
    }

    componentDidMount() {
        this.props.getDecks()
    }

    shouldComponentUpdate() {
        return this.props.isFetching === false
    }

    keyExtractor = (item, index) => {
        return item.title + index
    }

    onPress = (deck) => {
        this.props.navigation.navigate('IndividualDeck', { deckTitle: deck.title })
    }

    renderDeckItem = ({ item }) => {
        return (
            <DeckListItem
                item={item}
                onPress={this.onPress} />
        )
    }

    renderSeparator = () => (<View style={styles.separator} />)

    render() {
        const { decks, navigation, isFetching, error } = this.props
        const decksArray = Object.keys(decks).map(key => decks[key])
        return (
            <View style={styles.container}>
                {
                    error
                        ? <Text style={styles.error}>There as an error fetching the decks.</Text>
                        : decksArray.length > 0
                            ? <FlatList
                                data={decksArray}
                                renderItem={this.renderDeckItem}
                                keyExtractor={this.keyExtractor}
                                ItemSeparatorComponent={this.renderSeparator} />
                            : isFetching
                                ? <ActivityIndicator animating={true} />
                                : <EmptyDeckList navigation={navigation} />
                }
            </View>
        )
    }
}

function mapStateToProps({ decks, error }) {
    if (error === true) {
        return {
            isFetching: false,
            decks,
            error
        }
    }

    if (!DeckList.dataWasFetched) {
        DeckList.dataWasFetched = true
        return {
            isFetching: true,
            decks
        }
    } else {
        return {
            isFetching: false,
            decks
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => { dispatch(getDecks()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
