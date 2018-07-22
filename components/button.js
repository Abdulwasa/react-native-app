import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';


export default function Button({onPress, styles, text, color}){
    return (
      <View>
					<TouchableOpacity onPress={onPress} style={styles, {backgroundColor: color}}>
						<Text style={styles}> {text} </Text>
					</TouchableOpacity>
      </View>
    );
}
