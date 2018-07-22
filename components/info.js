import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';


export default function Info({onPress, style, text, color}){
    return (
      <View>
					<TouchableOpacity onPress={onPress}>
						<Text style={style}> {text} </Text>
					</TouchableOpacity>
      </View>
    );
}
