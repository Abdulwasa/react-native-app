import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	 KeyboardAvoidingView
  } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { orange, white, purple, green } from '../untils/colors'
import { addCard } from '../actions/index'
import { addCardToDeck } from '../untils/api'
import Button from './button'

class AddCard extends React.Component {
	constructor(props) {
     super(props);
	this.state = {
		question: '',
		answer: '',
		correctAnswer: ''
	}
}

submitCard = (deck)=> {
const { question, answer, correctAnswer } = this.state;
this.props.dispatch(addCard({question, answer, correctAnswer, deck}))
addCardToDeck(deck, {question, answer, correctAnswer})

this.setState({question: '', answer: '', correctAnswer: ''})
this.props.navigation.dispatch(NavigationActions.back({key: null}))
}

  render() {
		const name = this.props.navigation.state.params.entryId;
const { question, answer, correctAnswer } = this.state
    return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
		      <View style={styles.container}>

						<Text style={styles.title}> what is the question ?</Text>
						<TextInput style={styles.textInput} onChangeText={(question)=> this.setState({question: question})} value={question} />

						<Text style={styles.title}> what is the correct answer ? </Text>
						<TextInput style={styles.textInput} onChangeText={(answer)=> this.setState({answer: answer})} value={answer}  />

						<Text style={styles.title}> ist It true or false ?  </Text>
						<TextInput style={styles.textInput} onChangeText={(correctAnswer)=> this.setState({correctAnswer: correctAnswer})} value={correctAnswer}  />

						<TouchableOpacity style={styles.button}>
											<Text style={styles.button} onPress={()=> this.submitCard(name)}> submit
											</Text>
						</TouchableOpacity>
		      </View>
			</KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
	textInput: {
		width: 200,
		height: 30,
		padding: 5,
		borderWidth: 1,
		borderColor: '#754444',
		margin: 20,
		borderRadius: 5
	},
	title: {
		fontSize: 25,
		color: green
	},
	button: {
		borderWidth: 0.1,
		borderColor: orange,
		padding: 10,
		borderRadius: 7,
		backgroundColor: orange,
	}
});

export default  connect()(AddCard)
