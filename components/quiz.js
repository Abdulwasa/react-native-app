import React from 'react';
import {
	StyleSheet,
	Text,
	 View,
	 TouchableOpacity,
	 KeyboardAvoidingView
 } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { orange, white, red, purple, green} from '../untils/colors'
import Button from './button'
import Info from './info'
import DeckView from './deckView'
import { setLocalNotification, clearLocalNotification} from '../untils/api'


class Quiz extends React.Component {
	componentDidMount(){
			clearLocalNotification()
			.then(setLocalNotification())
	}

	constructor(props) {
		 super(props);
	this.state = {
		questionNumber: 0,
		show: false,
		correct: 0,
		incorrect: 0
	}
}

showAnswer = ()=>{
	!this.state.show ? this.setState({show: true}) : this.setState({show: false})
}

checkAnswer = (answer)=>{
	const { questionNumber, show, incorrect,  correct } = this.state
	const { decks } = this.props;
	const deck = this.props.navigation.state.params.entryId;
	const correctAnswer = decks[deck].questions[questionNumber].correctAnswer

	if(answer === correctAnswer){
		this.setState({
			questionNumber: this.state.questionNumber + 1,
		  correct: this.state.correct + 1})
	}else {
			this.setState({questionNumber: this.state.questionNumber + 1, incorrect: this.state.incorrect + 1})
	}

this.setState({show: false})
}

goBack = ()=>{
	this.props.navigation.navigate('Home')
}

restart = ()=>{
		const deck = this.props.navigation.state.params.entryId;
		this.props.navigation.navigate('DeckView', {entryId: deck})
}
render() {
		const { questionNumber, show, correct } = this.state
		const { decks } = this.props;
		const deck = this.props.navigation.state.params.entryId;



if(questionNumber === decks[deck].questions.length){
	if(correct === decks[deck].questions.length){
	return (
		  <View style={styles.card}>
			<Text style={styles.title}> congratulations,
					you have achieved
					<Text style={styles.number}> { correct } </Text>
					 of <Text style={styles.number}>
					 { decks[deck].questions.length } ! </Text>
			 </Text>

					<TouchableOpacity>
								<Text style={styles.button} onPress={()=> this.goBack()}> go back to decks
								</Text>
					</TouchableOpacity>

			</View>
	)}else {
		return (
				<View style={styles.card}>
				<Text style={styles.red}>
						you have achieved
						<Text style={styles.number}> { correct } </Text>
						 of <Text style={styles.number}>
						 { decks[deck].questions.length } ! </Text>
				 </Text>

				<TouchableOpacity>
							<Text style={styles.button} onPress={()=> this.restart()}> try it again
							</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
else{
    return (
      <View style={styles.card}>
			<Text style={styles.length}>
				{ correct } / {decks[deck].questions.length}
			</Text>

			<Text style={styles.questions}>
			{
				!show ? decks[deck].questions[questionNumber].question : decks[deck].questions[questionNumber].answer
			}
			</Text>

			{
				!show ? <Info style={styles.button} text='answer' onPress={this.showAnswer} /> : <Info style={styles.button} text='queston' onPress={this.showAnswer} />
			}

			<Button styles={styles.button} text='Correct' onPress={()=> this.checkAnswer('True')}/>

			<Button styles={styles.button} text='Incorrect' onPress={()=> this.checkAnswer('False')}/>
      </View>
    );
  }

}
}


const styles = StyleSheet.create({
	card:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 10,
    borderRadius: 40,
    margin: 5,
    backgroundColor: orange
  },
	questions:{
		  color: white,
			fontSize: 25
	},
	button: {
		borderWidth: 0.1,
		borderColor: red,
		padding: 10,
		backgroundColor: purple,
		margin: 5,
		padding: 10,
		borderRadius: 5,
		color: white
	},
length:{
	position: 'absolute',
	top: 10,
	left: 180
},
title:{
	fontSize: 25,
	color: white
},
number:{
	color: green
},
red:{
	fontSize: 25,
	color: white,
	color: red
}
});

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)
