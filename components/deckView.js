import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

import { getData } from '../untils/api'
import Button from './button'
import { purple, red, white, orange } from '../untils/colors'

class DeckView extends React.Component {
  render() {
		const deck = this.props.navigation.state.params.entryId;
		const { decks } = this.props

    return (
      <View style={styles.card}>
				<Text style={styles.title}>{decks[deck].title}</Text>
				<Text style={styles.length}>{decks[deck].questions.length}</Text>

        <Button styles={styles.Btn} text='Add Card' color={purple} onPress={()=> 	this.props.navigation.navigate('AddCard', {entryId: deck})} />

        <Button styles={styles.BtnSubmit} text='start Quiz' color={red} onPress={()=> 	this.props.navigation.navigate('Quiz', {entryId: deck})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 10,
    borderRadius: 40,
    margin: 5,
    backgroundColor: orange
  },
	Btn:{
		padding: 10,
		borderRadius: 5,
		height: 40,
		margin: 10,
		width: 150,
    color: white,
    textAlign: 'center',
	},
	BtnSubmit:{
		color: white,
		textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    height: 40,
    width: 150
	},
  title:{
    color: white,
    fontSize: 25
  },
  length:{
    color: purple,
    fontSize: 25
  }

});

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckView)
