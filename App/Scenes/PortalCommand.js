import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Slider from "react-native-slider";

import BasicBackground from '../Modules/BasicBackground';

import MyStatusBar from '../Modules/StatusBar.js';
import BasicTextInput from '../Modules/BasicTextInput.js';
import BasicButton from '../Modules/BasicButton.js';
import CenterContentWrapper from '../Modules/CenterContentWrapper';

export default class PortalCommand extends Component {
  constructor(props){
    super(props);
    var self = this;

    self.watchId1 = global.device.watch('connected', function(newValue){
      self.forceUpdate();

      if(newValue === false){
        Actions.popTo('open');
      }
    });

    self.watchId2 = global.robot.watch('rollValue', function(newValue){
      self.forceUpdate();
    });
    self.watchId3 = global.robot.watch('yawValue', function(newValue){
      self.forceUpdate();
    });
    self.watchId4 = global.robot.watch('pitchValue', function(newValue){
      self.forceUpdate();
    });
  }

  componentWillUnmount(){
    var self = this;
    global.device.unwatch(self.watchId1);
    global.robot.unwatch(self.watchId2);
    global.robot.unwatch(self.watchId3);
    global.robot.unwatch(self.watchId4);
  }

  render() {
    var self = this;
    return (
      <BasicBackground>
        <TouchableOpacity onPress={function(){Actions.song();}}>
          <Text style={{color:'white', textAlign:'center', fontSize: 28, marginTop: 30,}}>Portal Turret</Text>
        </TouchableOpacity>
        <Text style={{color:'#FFFFFF99', textAlign:'center', fontSize: 20, marginTop: 0,}}>Command Center</Text>
        <CenterContentWrapper style={{backgroundColor:'#11111188', margin: 20, padding: 20, borderRadius: 5,}}>
          <View
            style={{
              alignSelf:"stretch",
              margin: 30,
              marginTop: 0,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}/>
          {/*<Text style={{color:'white'}}>Roll</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.rollValue}
            minimumValue={0}
            maximumValue={180}
            step={1}
            onValueChange={ rollValue => { global.robot.rollValue = rollValue } }/>
          <Text style={{color:'white'}}>Pitch</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.pitchValue}
            minimumValue={0}
            maximumValue={180}
            step={1}
            onValueChange={ pitchValue => { global.robot.pitchValue = pitchValue } }/>*/}
          <Text style={{color:'white', fontSize: 20,}}>- Yaw -</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.yawValue}
            minimumValue={65}
            maximumValue={115}
            step={1}
            onSlidingComplete={function(){
              var dummy = {
                 x: global.robot.rollValue,
                 y: global.robot.yawValue,
                 z: global.robot.pitchValue,
              };
              global.device.writeRead("UPDATEPOSTURE:" + JSON.stringify(dummy), function(answer){
                global.robot.updatedRollValue = global.robot.rollValue;
                global.robot.updatedYawValue = global.robot.yawValue;
                global.robot.updatedPitchValue = global.robot.pitchValue;
              });
            }}
            onValueChange={ yawValue => { global.robot.yawValue = yawValue } }/>
          <Text style={{color:'white', fontSize: 20,}}>- Wings -</Text>
          <Text style={{color:'gray', marginTop:20,}}>Time</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.wingTime}
            minimumValue={0}
            maximumValue={2000}
            step={1}
            onValueChange={ wingTime => { self.forceUpdate(); global.robot.wingTime = wingTime; } }/>
          <Text style={{color:'gray', alignSelf:'stretch', textAlign:'right', marginRight:5,}}>{global.robot.wingTime}</Text>
          <Text style={{color:'gray'}}>Power</Text>
          <Slider
            style={{alignSelf:"stretch", height:50}}
            thumbTintColor={"white"}
            value={global.robot.wingPower}
            onValueChange={self.forceUpdate}
            minimumValue={0}
            maximumValue={20}
            step={1}
            onValueChange={ wingPower => { self.forceUpdate(); global.robot.wingPower = wingPower; } }/>
          <Text style={{color:'gray', alignSelf:'stretch', textAlign:'right', marginRight:5,}}>{ global.robot.wingPower >= 10 ? ("Expand " + (global.robot.wingPower - 10)) : ("Retract " + (10 - global.robot.wingPower))}</Text>
          <BasicButton title={"Update"}
                       disabled={false}
                       style={{margin: 15, marginTop: 10, marginBottom:25,}}
                       buttonStyle={{width: global.device.width - 20, backgroundColor:'#333333', borderRadius: 10, maxWidth:200,}}
                       titleStyle={{color:'white', fontSize: 12, margin: 5,}}
                       onPress={function(){
                         var dummy = {
                            t: global.robot.wingTime,
                            p: global.robot.wingPower,
                         };
                         global.device.writeRead("UPDATEWINGS:" + JSON.stringify(dummy), function(answer){});
                       }}/>
          <Text style={{color:'white', fontSize: 20}}>- Image -</Text>
          <BasicButton title={"Take"}
                       disabled={false}
                       style={{margin: 15, marginTop: 15, marginBottom:0,}}
                       buttonStyle={{width: global.device.width - 20, backgroundColor:'#333333', borderRadius: 10, maxWidth:200,}}
                       titleStyle={{color:'white', fontSize: 12, margin: 5,}}
                       onPress={function(){ Actions.image(); }}/>
          <View
            style={{
              alignSelf:"stretch",
              margin: 30,
              marginBottom:0,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}/>
          {/*<BasicButton title={"Calibrate"}
                       disabled={false}
                       style={{margin: 15, marginTop: 30, marginBottom:0,}}
                       buttonStyle={{width: global.device.width - 20, maxWidth:200,}}
                       titleStyle={{color:'#39AA39', fontSize: 16,}}
                       onPress={function(){ Actions.calibrate(); }}/>*/}
          <BasicButton title={"Disconnect"}
                       disabled={false}
                       style={{margin: 15, marginTop: 15, marginBottom:0,}}
                       buttonStyle={{width: global.device.width - 20, maxWidth:200,}}
                       titleStyle={{color:'#AA3939', fontSize: 16,}}
                       onPress={function(){ global.device.disconnect(); Actions.popTo("open"); }}/>
        </CenterContentWrapper>
      </BasicBackground>
    );
  }
}
