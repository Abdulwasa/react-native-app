import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	 KeyboardAvoidingView
 } from 'react-native';
import {saveDecksTitle } from '../untils/api'
import { addDeck} from '../actions/index'
import DeckView from './deckView'
import { connect } from 'react-redux'

import { green, red } from '../untils/colors'

class AddDeck extends React.Component {
	constructor(props) {
     super(props);
	this.state = {
		text: ''
	}
}

submitTitle = ()=>{
		const { text } = this.state
	 if(!text) {
		 return alert("please fill the input")
	 }else{
		 saveDecksTitle(text)
		 this.props.dispatch(addDeck(text))
		 this.props.navigation.navigate('DeckView', {entryId: text})
		 this.setState({text: 'enter the title here !'})
	 }
	}

  render() {
		const { text } = this.state
    return (
			<KeyboardAvoidingView style={styles.container}>
		      <View style={styles.container}>
						<Text style={styles.title}>what is the title of  the decks</Text>
								<TextInput style={styles.textInput} onChangeText={(text)=> this.setState({text: text})} value={text}
							 />

								<Button style={styles.button} onPress={this.submitTitle} title='submit'
								/>
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
		height: 40,
		padding: 5,
		borderWidth: 1,
		borderColor: '#754444',
		margin: 50,
		borderRadius: 5
	},
	title: {
		fontSize: 25,
		color: green
	},
	button: {
		borderWidth: 0.1,
		borderColor: red,
		padding: 10,
		borderRadius: 7
	}
});

function mapStateToProps({decks}){
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)
