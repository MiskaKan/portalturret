import React, { Component } from 'react';
import {  View, ScrollView, Text, ImageBackground } from 'react-native';

import MyStatusBar from './StatusBar.js';

export default class BasicBackground extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var self = this;
    return(
        <ScrollView style={{flex:1,}}
                    scrollEnabled={false}
                    contentContainerStyle={{flex: 1, flexGrow: 1, flexDirection: 'column', justifyContent: 'center',}}>
          <View style={{flex:1,}}>
            <ImageBackground
                style={{flex:1, backgroundColor: '#333333',}}
                opacity={0.95}
                resizeMode={'cover'}
                source={require('../Images/background2.jpg')}>
              <MyStatusBar />
              {self.props.children}
            </ImageBackground>
          </View>
        </ScrollView>
    );
  }
}
