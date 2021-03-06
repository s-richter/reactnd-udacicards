import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducer from './src/redux/reducer'
import DeckList from './src/components/DeckList'
import IndividualDeck from './src/components/IndividualDeck'
import NewDeck from './src/components/NewDeck'
import NewCard from './src/components/NewCard'
import Quiz from './src/components/Quiz'
import { blue, white } from './src/utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${white}`
  }
})

// the statusbar component ensuring that the app is fully displayed
const UdaciStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

// content of the "Home" screen, showing the deck list on one tab and a screen to add decks on
//  a second tab
const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" size={24} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus" size={24} color={tintColor} />
        ),
      },
    }
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? blue : white,
      showIcon: true,
      style: {
        height: 70,
        backgroundColor: Platform.OS === 'ios' ? white : blue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    }
  }
)

// the main navigator incorporating the "Home" screen and all the other screens
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
})

const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)))

// the main component
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={blue} />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}


