import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class BasicButton extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var self = this;
    return(
      <View style={[{ alignItems: 'center', justifyContent: 'center',}, self.props.style]}>
        <TouchableOpacity
          style={[{ backgroundColor:"transparent", borderWidth: 0, paddingHorizontal: 20, }, self.props.buttonStyle]}
          onPress={ function(){ self.props.onPress(); } }
          activeOpacity={0.6}
          disabled={ self.props.disabled }>
            <Text style={[{color: 'white',textAlign:'center',}, self.props.titleStyle]}>{self.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
