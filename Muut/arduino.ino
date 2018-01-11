#include <Servo.h> 
#include <Wire.h>
#include <ArduinoJson.h>

String commandBuffer = "";
Servo myservo;
Servo continuousServo;
int x = 0;
int y = 0;  //Yaw
int z = 0;
int t = 0;  //Time to open wings
int p = 0;  //Power to open wings
int zeroReference = 91; //91 = zero reference

int tested = 0;
unsigned long  openWingStart = 0;
unsigned long closeWingStart = 0;
unsigned long    currentTime = 0;

void attachServo(){
  continuousServo.attach(10);
}

void setup() {
  Wire.begin(8);
  Wire.onReceive(receiveEvent);
  Serial.begin(9600);
  
  currentTime = millis();
  myservo.attach(9);
  attachServo();
}

void executeCommand(){
  if(commandBuffer.length() > 0){
    int idx = commandBuffer.indexOf("_END");
    if(idx >= 0){
      String tmp = commandBuffer.substring(0, idx);
      processCommand(tmp);
      commandBuffer = commandBuffer.substring(idx + 4);
    }
  }
}

void loop() {
  currentTime = millis();
  myservo.write(y);
  if( (currentTime - openWingStart) < t){
    continuousServo.write(zeroReference - p);
  } else  if( (currentTime - closeWingStart) < t){
    continuousServo.write(zeroReference - p);
  } else {
    continuousServo.detach();
    executeCommand();
  }
}

void processCommand(String command){
  StaticJsonBuffer<200> jsonBuffer;
  if(command.startsWith("UPDATEPOSTURE:")){
    String data = command.substring(14);
    JsonObject& root = jsonBuffer.parseObject(data);
    x = root["x"];
    y = root["y"];
    z = root["z"];
    
    //Serial.println(x);
    //Serial.println(y);
    //Serial.println(z);
  } else if(command.startsWith("UPDATEWINGS:")){
    attachServo();

    String data = command.substring(12);
    JsonObject& root = jsonBuffer.parseObject(data);
    t = root["t"];
    p = (int)root["p"] - 25;
    
    if(p > 0){
      openWingStart = millis();
    } else {
      closeWingStart = millis();
    }
    
    //Serial.println(t);
    //Serial.println(p);
  }
}

void receiveEvent(int howMany){
  while(Wire.available()){
    char c = Wire.read();
    commandBuffer.concat(c);
  }
}

