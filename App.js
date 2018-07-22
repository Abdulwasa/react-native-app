import React, {Component} from 'react';
import { StyleSheet, Text, View , StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Constants } from 'expo'

import reducer from './reducer/index'
import { purple, white, red } from './untils/colors'
import Decklist from './components/deckList'
import AddDeck from  './components/addDeck'
import DeckView from './components/deckView'
import AddCard from  './components/addCard'
import Quiz from './components/quiz'
import { setLocalNotification, clearLocalNotification} from './untils/api'



function statusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor: backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decklist,
    navigationOption: {
      tabBarLabel: 'Decks',
      tabBarIcon: (tintColor)=> <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }},
    AddDeck: {
      screen: AddDeck,
      tabBarLabel: 'add Deck',
      tabBarIcon: (tintColor)=> <FontAwesome name='plus-square' size={30} color={tintColor} />
    }

},{

tabBarOptions: {
  activeTintColor: white,
  style:{
    height: 20,
    backgroundColor: purple
  }
}})

export const Main = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions:{
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions:{
      title: 'Infos',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})



export default class App extends Component {
  componentDidMount(){
  setLocalNotification()
  }

  render() {
    const store = createStore(reducer,  applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
        <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <Main />
        </View>
      </Provider>
    );
  }
}
