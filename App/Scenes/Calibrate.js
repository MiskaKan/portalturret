import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Slider from "react-native-slider";

import BasicBackground from '../Modules/BasicBackground';

import MyStatusBar from '../Modules/StatusBar.js';
import BasicTextInput from '../Modules/BasicTextInput.js';
import BasicButton from '../Modules/BasicButton.js';
import CenterContentWrapper from '../Modules/CenterContentWrapper';

export default class Calibrate extends Component {
  constructor(props){
    super(props);
    var self = this;
  }

  render() {
    var self = this;
    return (
      <BasicBackground>
        <Text style={{color:'white', textAlign:'center', fontSize: 28, marginTop: 30,}}>Portal Turret</Text>
        <Text style={{color:'#FFFFFF99', textAlign:'center', fontSize: 20, marginTop: 0,}}>Calibration</Text>
        <CenterContentWrapper style={{backgroundColor:'#11111188', margin: 20, padding: 20, borderRadius: 5,}}>
          {/*<Text style={{color:'white'}}>Roll</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.updatedRollValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            onValueChange={ rollValue => { global.robot.rollValue = rollValue; global.robot.updatedRollValue = rollValue } }/>*/}
          <Text style={{color:'white'}}>Yaw</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.updatedYawValue}
            minimumValue={0}
            maximumValue={180}
            step={1}
            onValueChange={ yawValue => { global.robot.yawValue = yawValue; global.robot.updatedYawValue = yawValue } }/>
          {/*<Text style={{color:'white'}}>Pitch</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.updatedPitchValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            onValueChange={ pitchValue => { global.robot.pitchValue = pitchValue; global.robot.updatedPitchValue = pitchValue } }/>*/}
          <BasicButton title={"Back"}
                       disabled={false}
                       style={{margin: 15, marginTop: 15, marginBottom:0,}}
                       buttonStyle={{width: global.device.width - 20, maxWidth:200,}}
                       titleStyle={{color:'gray', fontSize: 16,}}
                       onPress={function(){ Actions.pop(); }}/>
        </CenterContentWrapper>
      </BasicBackground>
    );
  }
}
