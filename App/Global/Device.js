import { AppState, Dimensions, Platform, NetInfo } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'

export default class Device {
  constructor(){
    var self = this;
    const {height, width} = Dimensions.get('window');
    self.height = height;
    self.width = width;

    /*Initialization*/
    self.connectedId      = "None";
    self.connected        = false;
    self.isEnabled        = false;
    self.connecting       = false;
    self.isProcessing     = false;
    /*Initialization END*/

    /*Binding*/
    self.setupBluetooth = self.setupBluetooth.bind(self);
    self.requestEnable = self.requestEnable.bind(self);
    self.enable = self.enable.bind(self);
    self.disable = self.disable.bind(self);
    self.connect = self.connect.bind(self);
    self.disconnect = self.disconnect.bind(self);
    self.write = self.write.bind(self);
    /*Binding END*/

    self.setupBluetooth();
  }

  setupBluetooth(){
    var self = this;

    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values;
      self.isEnabled = isEnabled;
    })

    BluetoothSerial.on('connectionLost', () => {
      console.log("Connection lost");
      self.connected = false;
    });
  }

  /* [android] */
  requestEnable () {
   var self = this;
   BluetoothSerial.requestEnable()
   .then((res) => {self.isEnabled = true })
   .catch((err) => function(){console.log("Error on requestEnable");})
  }

  /* [android] */
  enable () {
   var self = this;
   BluetoothSerial.enable()
   .then((res) => { self.isEnabled = true })
   .catch((err) => function(){console.log("Error on enable");})
  }

  /* [android] */
  disable () {
   var self = this;
   BluetoothSerial.disable()
   .then((res) => { self.isEnabled = false })
   .catch((err) => function(){console.log("Error on disable");})
  }

  /* [android] */
  connect(deviceId, cb) {
    var self = this;
    self.connecting = true;
    BluetoothSerial.connect(deviceId)
    .then((res) => {
      self.connected = true;
      self.connecting = false;
      self.connectedId = deviceId;
      console.log(res);
      cb();
    })
    .catch((err) => function(){console.log("Error on connect");});

    setTimeout(function(){
      self.connecting = false;
    }, 15000);
  }

  /* [android] */
  disconnect () {
    var self = this;
    BluetoothSerial.disconnect()
    .then(() => { self.connected = false; })
    .catch((err) => function(){console.log("Error on disconnect");})
  }

  /* [android] */
  write (message) {
    var self = this;
    if (!self.connected) {
      console.log('You must connect to device first');
    }

    BluetoothSerial.write(message + "_END")
    .then((res) => {
      self.connected = true;
        self.connected = true;
    })
    .catch((err) => function(){console.log("Error on write");})
  }

  /* [android] */
  writeRead(message, cb, cbPackages) {
    var self = this;
    if (!self.connected) {
      console.log('You must connect to device first');
    }
    if(!self.isProcessing){
      self.isProcessing = true;
      var packages = 0;
      BluetoothSerial.write(message + "_END")
      .then(() => {
          self.connected = true;
          var readData = "";

          function readChunkLoop(safe){
            BluetoothSerial.readFromDevice()
              .then((data) => {
                readData += data;
                if(data.length != 0 && safe > 0 && !readData.endsWith("_END")){
                  cbPackages ? cbPackages(++packages) : null;
                  readChunkLoop(--safe);
                  //console.log("Reading: " + message);
                } else if(data.length != 0 && safe > 0  && readData.endsWith("_END")) {
                  self.isProcessing = false;
                  //console.log("Calling back: " + message);
                  //console.log("Safe: " + safe);
                  cb(readData.slice(0, -4));
                } else if(data.length == 0) {
                  if(message === "SHOOTIMAGE:"){
                    setTimeout(() => {
                      readChunkLoop(--safe);
                    }, 1000);
                  } else {
                    self.isProcessing = false;
                  }
                  //console.log("Was empty: " + message);
                } else if(safe <= 0) {
                  self.isProcessing = false;
                }
              });
          }

          setTimeout(function(){
            readChunkLoop(500);
          }, 500);
        })
      .catch((err) => function(){console.log("Error on write");})
    } else {
      setTimeout(() => {
        cbPackages ? cbPackages("Device busy..") : null;
        self.writeRead(message, cb, cbPackages);
      }, 100);
    }
  }
}
