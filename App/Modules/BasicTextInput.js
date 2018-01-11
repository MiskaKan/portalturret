import React, { Component } from 'react';
import {  View, TextInput } from 'react-native';

export default class BasicTextInput extends Component {
  constructor(props){
    super(props);
    var self = this;

    self.state = {
      text: self.props.text ? self.props.text : "",
      tooLong: false,
    };

    self.getText = self.getText.bind(self);
    self.setText = self.setText.bind(self);
  }

  setText(_text){
    var self = this;
    self.setState({text:_text});
  }

  getText(){
    var self = this;
    return self.state.text;
  }

  render(){
    var self = this;
    return(
      <TextInput style={[{ alignSelf: 'stretch',
                            textAlign: 'center',
                            backgroundColor: self.state.tooLong ? '#A93434' : '#EEEEEE',
                            borderRadius: 10,
                            height: 40,
                            fontSize: 14,
                          }, self.props.style]}
                  value={self.state.text}
                  onChangeText={(text) => {
                    var _text = text;
                    self.setState({text: _text, tooLong: self.props.maxLength ? _text.length > self.props.maxLength : false, });
                  }}
                  editable={typeof self.props.editable !== 'undefined' ? self.props.editable : true}
                  placeholder= {self.props.placeholder}
                  placeholderTextColor="#555555"
                  underlineColorAndroid = 'transparent'/>
    );
  }
}
