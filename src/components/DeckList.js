import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native'
import { Constants } from 'expo'
import { getDecks } from '../redux/actions'
import { gray, red } from '../utils/colors'
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
        marginBottom: 24,
        width: '90%',
        alignSelf: 'center',
        fontSize: 24,
        color: `${red}`
    }
})

// component that shows all the available decks
class DeckList extends Component {
    constructor() {
        super()
        DeckList.dataWasFetched = false // needed to show empty deck list if no decks have yet
                                        //  been created
    }

    componentDidMount() {
        this.props.getDecks()
    }

    shouldComponentUpdate(next) {
        return next.isFetching === false
    }

    onPress = (deck) => {
        this.props.navigation.navigate('IndividualDeck', { deckTitle: deck.title })
    }

    // used for the FlatList component below
    renderDeckItem = ({ item }) => {
        return (
            <DeckListItem
                item={item}
                onPress={this.onPress} />
        )
    }

    // used for the FlatList component below
    keyExtractor = (item, index) => {
        return item.title + index
    }

    // used for the FlatList component below
    renderSeparator = () => (<View style={styles.separator} />)

    render() {
        const { decks, navigation, isFetching, errorLoadDecks, errorAddDeck } = this.props
        const decksArray = Object.keys(decks).map(key => decks[key])
        return (
            <View style={styles.container}>
                {
                    errorAddDeck && <Text style={styles.error}>
                        There was an error adding the deck.
                    </Text>
                }
                {
                    errorLoadDecks
                        ? <Text style={styles.error}>
                            There was an error fetching the decks.
                        </Text>
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

function mapStateToProps({ decks, errorLoadDecks, errorAddDeck }) {
    if (errorLoadDecks === true) {
        return {
            isFetching: false,
            decks,
            errorLoadDecks
        }
    }

    if (!DeckList.dataWasFetched) {
        DeckList.dataWasFetched = true  // decks are then fetched in componentDidMount()
        return {
            isFetching: true,
            decks,
            errorAddDeck
        }
    } else {
        return {
            isFetching: false,
            decks,
            errorAddDeck
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => { dispatch(getDecks()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
