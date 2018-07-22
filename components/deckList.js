import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'


import { receiving } from '../actions/index'
import DeckView from './deckView'
import { red, white, purple} from '../untils/colors'

class Decklist extends React.Component {
componentDidMount(){
  this.props.receiving()
}
  render() {
		const { decks } = this.props
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {
					Object.keys(decks) ? Object.keys(decks).map((deck)=>{
					const { title, questions } = decks[deck]
					return(
						<View key={deck} style={styles.card}>
								<Text style={styles.title}> {title} </Text>
								<Text style={styles.length}> {questions.length} </Text>

                <Button onPress={()=> navigate('DeckView', {entryId: deck})} title='view deck'/>
						</View>
					)
				}): 'There is an error !'}
      </View>
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
  card:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: red
  },
  title:{
    fontSize: 25,
    color: white
  },
length:{
  fontSize: 25,
  color: purple
}
});

function mapStateToProps(decks){
  return {
    decks
  }
}



export default connect(mapStateToProps, { receiving })(Decklist)
