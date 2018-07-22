import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_STORAGE_KEY = 'flashCards: decks'
const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

const initial ={
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        correctAnswer: 'True'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        correctAnswer: 'False'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        correctAnswer: 'False'
      }
    ]
  }
}


export function getDecks(deck){
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
	.then(result => {
		if(result === null){
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initial))
			return initial
		}else {
			return JSON.parse(result)
		}
	})
}

export function saveDecksTitle(title){
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title: title,
			questions: []
		}
	}))
}

export function addCardToDeck(name, card){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(re => JSON.parse(re))
  .then(result => {
    result[name].questions.push(card)
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(result))
    return result
  })
}



export function createLocalNotification(){
  return{
    title: 'you have forgotten to log in to day !',
    body: 'you have forgotten to log in to day !',
    ios:{
      sound: true,
    },
    android:{
      sound: true,
      priority: 'high',
      vibrate: true
    }
  }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(result => JSON.parse(result))
      .then(result => {

        if(result === null){
          Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status })=> {
            if(status === 'granted'){
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(15)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationsAsync(
                createLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
        }


      }
      )
}


export function clearLocalNotification () {
return AsyncStorage.removeItem(NOTIFICATION_KEY)
 .then(Notifications.cancelAllScheduledNotificationsAsync())
}
