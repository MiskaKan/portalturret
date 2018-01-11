import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BasicBackground from '../Modules/BasicBackground';

import MyStatusBar from '../Modules/StatusBar.js';
import BasicTextInput from '../Modules/BasicTextInput.js';
import BasicButton from '../Modules/BasicButton.js';
import CenterContentWrapper from '../Modules/CenterContentWrapper';

export default class Connect extends Component {
  constructor(props){
    super(props);
    var self = this;

    self.renderConnection = self.renderConnection.bind(self);

    self.watchId1 = global.device.watch('connected', function(newValue){
      self.forceUpdate();
    });

    self.watchId2 = global.device.watch('connectedId', function(newValue){
      self.forceUpdate();
    });

    self.watchId3 = global.device.watch('connecting', function(newValue){
      self.forceUpdate();
    });
  }

  componentDidMount(){
    var self = this;
    self.bluetoothId.setText("B8:27:EB:12:FA:32");
  }

  componentWillUnmount(){
    var self = this;
    global.device.unwatch(self.watchId1);
    global.device.unwatch(self.watchId2);
    global.device.unwatch(self.watchId3);
  }

  renderConnection(){
    var self = this;

    if(global.device.connecting){
      return (
        <View>
          <Text style={{backgroundColor:'transparent', color:'white', fontSize: 25, marginBottom: 15,}}>Connecting...</Text>
        </View>
      );
    } else {
        return (
          <View>
            <Text style={{backgroundColor:'transparent', color:'white', fontSize: 25, marginBottom: 15,}}>Connect to a turret</Text>
            <BasicTextInput ref={(r) => {self.bluetoothId = r;}} placeholder="00:11:22:33:44:55" />
            <BasicButton title={"Connect"}
                         disabled={false}
                         style={{margin: 15, marginTop: 15, marginBottom:0,}}
                         buttonStyle={{width: global.device.width - 20, maxWidth:200,}}
                         onPress={function(){ global.device.connect(self.bluetoothId.getText(), function(){ Actions.commandcenter();}); }}/>
          </View>
        );
    }

  }

  render() {
    var self = this;
    return (
      <BasicBackground>
        <CenterContentWrapper style={{backgroundColor:'#111111CC', margin: 20, padding: 20, borderRadius: 5,}}>
          {self.renderConnection()}
        </CenterContentWrapper>
      </BasicBackground>
    );
  }
}
