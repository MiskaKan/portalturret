import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import BasicBackground from '../Modules/BasicBackground';

import MyStatusBar from '../Modules/StatusBar.js';
import BasicTextInput from '../Modules/BasicTextInput.js';
import BasicButton from '../Modules/BasicButton.js';
import CenterContentWrapper from '../Modules/CenterContentWrapper';

export default class ImageScene extends Component {
  constructor(props){
    super(props);
    var self = this;
    self.state = {
      isLoading: true,
      data: '',
      packages: 0,
    }

    global.device.writeRead("SHOOTIMAGE:", function(answer){
      self.setState({
        isLoading: false,
        data:answer,
      });
    }, function(packages){
      self.setState({packages: packages,});
    });

    self.renderLoading = self.renderLoading.bind(self);
    self.renderDone = self.renderDone.bind(self);
  }

  renderLoading(){
    var self = this;
    if(self.state.isLoading){
      return (
        <View style={{flex:1,}}>
          <Text style={{color:'white', textAlign:'center', fontSize: 28, marginTop: 30,}}>Portal Turret</Text>
          <Text style={{color:'#FFFFFF99', textAlign:'center', fontSize: 20, marginTop: 0,}}>Vision</Text>
          <CenterContentWrapper style={{backgroundColor:'#11111188', margin: 20, padding: 20, borderRadius: 5,}}>
            <Text style={{color: 'white'}}>Loading image</Text>
            <Text style={{color: 'white'}}>{self.state.packages}</Text>
          </CenterContentWrapper>
        </View>
      );
    }
  }

  renderDone(){
    var self = this;
    if(!self.state.isLoading){
      return (
        <View style={{flex:1,}}>
          <Text style={{color:'white', textAlign:'center', fontSize: 28, marginTop: 30,}}>Portal Turret</Text>
          <Text style={{color:'#FFFFFF99', textAlign:'center', fontSize: 20, marginTop: 0,}}>Vision</Text>
          <CenterContentWrapper style={{backgroundColor:'#11111188', margin: 20, padding: 20, borderRadius: 5,}}>
            <Image
                source={{uri: `data:image/gif;base64,${self.state.data}`}}
                style={{flex:1, margin:20, width:global.device.width - 80, height:(global.device.width - 80) * 3.0 / 4.0, backgroundColor: '#333333',}}
                opacity={0.95}
                resizeMode={'cover'}/>
            <BasicButton title={"Back"}
                         disabled={false}
                         style={{margin: 15, marginTop: 15, marginBottom:0,}}
                         buttonStyle={{width: global.device.width - 20, maxWidth:200,}}
                         titleStyle={{color:'gray', fontSize: 16,}}
                         onPress={function(){ Actions.pop(); }}/>
          </CenterContentWrapper>
        </View>
      );
    }
  }

  render() {
    var self = this;
    return (
      <BasicBackground>
        {self.renderDone()}
        {self.renderLoading()}
      </BasicBackground>
    );
  }
}
