# UdaciCards: a react native app for flashcards - Udacity Nanodegree - Project 3

This app allows the user to create decks and questions for these decks and do quizzes on those decks.


## About

This is the third project for the Udacity React Nanodegree.
This app is a React Native app that runs on Android or IOS devices or emulators. It uses local storage to persist the decks and questions.
When the app starts, there are no decks available, and the user has to add a deck and one or more questions to this deck to be able to do quizzes.
The app also provides daily local notifications to remind the user to do quizzes.

The following screens are available:
* the "Home" or "Decks" screen shows the available decks and the number of cards (questions)
* the "New Deck" screen allows the user to add new decks
* the screens for the decks show the number of cards and allow the user to start a quiz
* the screen "Add a new card" allows the user to add a question and the related answer. Duplicates are not allowed
* the "Quiz" screen allows the user to do a quiz. The view can be switched between the question and the answer. The user then has to click on "Correct" or "Incorrect", depending on whether he or she answered correctly. Once the quiz is over, the results are shown and the quiz can be restarted or the user can navigate back to the deck screen.

The app currently offers no possibility to delete decks or questions or correct them.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).


## Installing

To install the app:

1. run `git clone https://github.com/s-richter/reactnd-udacicards` to clone the repository
2. type `cd reactnd-udacicards` to change the directory
3. run `yarn install` to install
4. run `yarn start` to start the app and use the Expo app on your phone to use this app
5. alternatively, run `yarn ios` or `yarn android` to use the app in an emulator. This app was tested on the Microsoft Visual Studio Emulator for Android


## Built With

* [React](https://facebook.github.io/react/) - the UI framework
* [Expo](https://expo.io/) - Expo for running React Native apps without using the app stores
* [React Native](https://facebook.github.io/react-native/) - React Native
* [Redux](https://github.com/reactjs/redux) - Redux for state management
* [Redux Thunk](https://github.com/gaearon/redux-thunk) - Thunk middleware for Redux
* [React Navigation](https://reactnavigation.org/) - Navigation components for React Native


## Authors

* [create-react-native-app](https://github.com/react-community/create-react-native-app) - *template for react native apps* - by the React Native team
* Stephan Richter - React Native app


## Contributing

Due to the nature of this project (final assessment project for Udacity's Redux course), no contributions by others are possible.