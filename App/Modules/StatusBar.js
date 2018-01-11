import React, { Component } from 'react';
import {  View, StatusBar, Platform } from 'react-native';

export default class MyStatusBar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={{
          backgroundColor: '#000000EE',
          alignSelf: 'stretch',
          ...Platform.select({
            ios: {
              height: 20,
            },
            android: {
              height: 0,
            },
          })
        }} />
      </View>
    );
  }
}
