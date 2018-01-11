import React, { Component } from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Device from './Global/Device';

import OpenS from './Scenes/Open';
import PortalCommandS from './Scenes/PortalCommand';
import CalibrateS from './Scenes/Calibrate';
import ImageS from './Scenes/ImageScene';
import SongS from './Scenes/Song';

enableWatch();

global.device = new Device();

global.robot = {
  wingPower: 10,
  wingTime: 500,
  rollValue: 90,
  yawValue: 90,
  pitchValue: 90,
  updatedRollValue: 90,
  updatedYawValue: 90,
  updatedPitchValue: 90
}

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="open" type={ActionConst.RESET} component={OpenS} hideNavBar={true} title="Open" initial={true} panHandlers={null}/>
          <Scene key="commandcenter" component={PortalCommandS} hideNavBar={true} title="Portal" panHandlers={null}/>
          <Scene key="calibrate" component={CalibrateS} hideNavBar={true} title="Calibrate" panHandlers={null}/>
          <Scene key="image" component={ImageS} hideNavBar={true} title="Image" panHandlers={null}/>
          <Scene key="song" component={SongS} hideNavBar={true} title="Song" panHandlers={null}/>
        </Scene>
      </Router>
    );
  }
}


function enableWatch(){

  /*
    Created from personal need.
    It is a bit different from the usual watch behavior.

    Usage:

    var example = { a: 'a', b:'b' };

    var watchId1 = example.watch('a', function(newValue){
      console.log(newValue);
    });

    example.a = 'newA'; // 'newA'

    var watchId2 = example.watch('a', function(newValue, oldValue){
      console.log(oldValue + " -> " + newValue);
    });

    example.a = 'newerA'; // 'newerA' && 'newA -> newerA'
    example.unwatch('a', watchId1);
    example.unwatch('a', watchId2);

    example.a = 'noWatch';
    Note: If executing watch function throws error it is automatically unwatched
  */

  if (!Object.prototype.watch) {
    var _uniqueId = 0;
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop, handler) {
          var self = this;
          var functionUniqId = prop + "_" + (_uniqueId++);

          if(typeof self._watch === 'undefined'){
            self._watch = {};
            self._watch.listeners = {};
            self._watch.values = {};
          }

          if(typeof self._watch.values[prop] === 'undefined'){
            self._watch.values[prop] = self[prop];
          }

          if(typeof self._watch.listeners[prop] === 'undefined'){
            self._watch.listeners[prop] = [];

            if (delete self[prop]) {
              self._watch.listeners[prop].push({name:functionUniqId, func:handler});
              Object.defineProperty(self, prop, {
                enumerable: true,
                configurable: true,
                get: function () {
                  return self._watch.values[prop];
                },
                set: function (val) {
                  var before = self._watch.values[prop];
                  self._watch.values[prop] = val;

                  for(var i = 0; i < self._watch.listeners[prop].length; i++){
                    var listener = self._watch.listeners[prop][i];
                    try {
                      listener.func(val, before);
                    } catch(err) {
                      self.unwatch(prop, listener.name);
                    }
                  }

                  return self._watch.values[prop];
                },
              });
            }

          } else {
            self._watch.listeners[prop].push({name:functionUniqId, func:handler});
          }


          return functionUniqId;
        }
    });
  }

  if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop, name) {
          var self = this;
          if(typeof self._watch !== 'undefined' &&
             typeof self._watch.listeners !== 'undefined' &&
             typeof self._watch.listeners[prop] !== 'undefined'){
            if(self._watch.listeners[prop].length === 1){
              var val = self[prop];
              delete self[prop];
              delete self._watch.values[prop];
              delete self._watch.listeners[prop];
              self[prop] = val;
            } else {
              var tmp = [];

              for(var i = 0; i < self._watch.listeners[prop].length; i++){
                var _single = self._watch.listeners[prop][i];
                if(_single.name !== name){
                  tmp.push(_single);
                }
              }

              self._watch.listeners[prop] = tmp;
            }
          }
        }
    });
  }
}
