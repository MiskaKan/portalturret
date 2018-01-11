import picamera
from bluetooth import *
import json
import datetime
import base64
import socket
import time
import smbus
import struct

camera = picamera.PiCamera()
camera.resolution = (512, 384)

class blueTooth:
    def __init__(self):
        self.myId           = "B8:27:EB:12:FA:32"
        self.server_sock    = None
        self.bus = smbus.SMBus(1)
        self.i2cAddress = 0x08
        
        self.initSocket()
        self.advertiseService()

    def processCommand(self, command, client_sock):
        print("Processing: {}".format(command))
        try:
            if(command.startswith("SHOOTIMAGE:")):
                camera.capture("tmp.jpg")
                with open("tmp.jpg", "rb") as image_file:
                    encoded_string = base64.b64encode(image_file.read())
                    client_sock.send(encoded_string)
                client_sock.send("_END")
            elif(command.startswith("UPDATEPOSTURE:")):
                _data = command + "_END"
                tmpData = [ord(c) for c in _data]
                while len(tmpData) > 0:
                    self.bus.write_i2c_block_data(self.i2cAddress, tmpData[0], tmpData[1:32])
                    tmpData = tmpData[32:]
                client_sock.send("_END")
            elif(command.startswith("UPDATEWINGS:")):
                _data = command + "_END"
                tmpData = [ord(c) for c in _data]
                while len(tmpData) > 0:
                    self.bus.write_i2c_block_data(self.i2cAddress, tmpData[0], tmpData[1:32])
                    tmpData = tmpData[32:]
                client_sock.send("_END")
        except Exception, e:
            print("Error {}".format(e))
        time.sleep(0.1)
        print("Done!")

    def advertiseService(self):
        advertise_service( self.server_sock, "SampleServer",
                           service_id = self.uuid,
                           service_classes = [ self.uuid, SERIAL_PORT_CLASS ],
                           profiles = [ SERIAL_PORT_PROFILE ])

    def initSocket(self):
        self.server_sock=BluetoothSocket( RFCOMM )
        self.server_sock.bind(("",PORT_ANY))
        self.server_sock.listen(1)
        self.port = self.server_sock.getsockname()[1]
        self.uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

    def closeConnections(self):
        client_sock.close()
        self.server_sock.close()
        print("disconnected")

_blueTooth = blueTooth()
print("Main program started...")
while True:
    print("Waiting for connection on RFCOMM channel %d" % _blueTooth.port)
    client_sock, client_info = _blueTooth.server_sock.accept()
    print("Accepted connection from ", client_info)

    try:
        isProcessing = False
        message = ""
        while True:
            message += client_sock.recv(1000)
            if not isProcessing:
                isProcessing = True
            if "_END" in message: _blueTooth.processCommand(message[0:message.index("_END")], client_sock); message = ""; isProcessing = False
    except IOError:
        print("Error with connected device")
