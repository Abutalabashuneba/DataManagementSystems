#!/usr/bin/python
from firebase import firebase

import serial
import time
import requests
from datetime import datetime

# Firebase
firebase = firebase.FirebaseApplication('https://test-9ff56.firebaseio.com/', None)

ser = serial.Serial("/dev/ttyUSB0", 115200, timeout=.5)
while True:
    # fetch the data through the serial port
    # remove any starting whitespace
    # check if fetched data is greatet than 0
    received = []; 
    incoming = ser.readline().strip()
    print(len(incoming))
    if(len(incoming) >= 30):
        for char in incoming:
            received.append(char)
        
        for x in received:
            print(x, end = " ")
            
        print("")
            
        sum1= 0
        sum2 = 0
        for x in received[0:8]:
            sum1+= x
            sum2 += sum1
            
        sum1 = sum1 % 255;
        sum2 = sum2 % 255
        
        sum3 = 0
        sum4 = 0
        for x in received[10:18]:
            sum3 += x
            sum4 += sum3
            
        sum3 = sum3 % 255
        sum4 = sum4 % 255
        
        sum5 = 0
        sum6 = 0
        for x in received[20:28]:
            sum5 += x
            sum6 += sum5
            
        sum5 = sum5 % 255
        sum6 = sum6 % 255
        
        verified = sum1 == received[8] and sum2 == received[9] and sum3 == received[18] and sum4 == received[19] and sum5 == received[28] and sum6 == received[29]; 
        #print(verified)
        
        sum7 = 0
        sum8 = 0
        if(len(incoming) >= 40):
            for x in received[30:38]:
                sum7 += x
                sum8 += sum7
                
        sum7 = sum7 % 255
        sum8 = sum8 % 255
        
        if(len(incoming) >= 40):
            verified = sum7 == received[38] and sum8 == received[39]
        
        print(verified)
        
        if(verified):
            separator = ','
            receivedS = [str(i) for i in received[0:10]]
            data1 = separator.join(receivedS)
            receivedS2 = [str(i) for i in received[10:20]]
            data2 = separator.join(receivedS2)
            receivedS3 = [str(i) for i in received[20:30]];
            data3 = separator.join(receivedS3)
            print(data1)
            print(data2)
            print(data3)
            receivedS4 = []
            data4 = ""
            if(len(incoming) >= 40):
                receivedS4 = [str(i) for i in received[30:40]];
                data4 = separator.join(receivedS4)
                print(data4)    
            
            print("")
            
            
            jsonData1 = {"data":data1, "timestamp":str(datetime.now())}
            jsonData2 = {"data":data2, "timestamp":str(datetime.now())}
            jsonData3 = {"data":data3, "timestamp":str(datetime.now())}
            
            url = "http://18.140.137.167/api/v1/data"
            error1 = requests.post(url, json = jsonData1, headers = {"Gateway-API-Key":"lN0XSuuwGNNZuoZaVP4KNxpv0xdgbQSs"})
            error2 = requests.post(url, json = jsonData2, headers = {"Gateway-API-Key":"lN0XSuuwGNNZuoZaVP4KNxpv0xdgbQSs"})
            error3 = requests.post(url, json = jsonData3, headers = {"Gateway-API-Key":"lN0XSuuwGNNZuoZaVP4KNxpv0xdgbQSs"})
            
            
            #Check node ID
            if(received[2] == 0 and received[3] == 15):
                chickenData = {
                    "temperature" : (received[5] * 256 * 256) + (received[6] * 256) + (received[7]),
                    "humidity" : (received[15] * 256 * 256) + (received[16] * 256) + (received[17]),
                    "light" : (received[25] * 256 * 256) + (received[26] * 256) + (received[27]),
                    "timestamp" : int(round(time.time() * 1000))
                }
                firebase.post("/Data/Chicken/Batch73",chickenData)
            elif(received[2] == 0 and received[3] == 25):
                bsflData = {
                    "temperature" : (received[5] * 256 * 256) + (received[6] * 256) + (received[7]),
                    "humidity" : (received[15] * 256 * 256) + (received[16] * 256) + (received[17]),
                    "soilTemp" : (received[25] * 256 * 256) + (received[26] * 256) + (received[27]),
                    "moisture" : (received[35] * 256 * 256) + (received[36] * 256) + (received[37]),
                    "timestamp" : int(round(time.time() * 1000))
                }
                firebase.post("/Data/BSFL/Area1",bsflData)
            elif(received[2] == 0 and received[3] == 35):
                chickenData2 = {
                    "temperature" : (received[5] * 256 * 256) + (received[6] * 256) + (received[7]),
                    "humidity" : (received[15] * 256 * 256) + (received[16] * 256) + (received[17]),
                    "light" : (received[25] * 256 * 256) + (received[26] * 256) + (received[27]),
                    "timestamp" : int(round(time.time() * 1000))
                }
                firebase.post("/Data/Chicken/Batch74",chickenData2)
                
            
            if(len(incoming) >= 40):
                jsonData4 = {"data":data4, "timestamp":str(datetime.now())}
                error4 = error3 = requests.post(url, json = jsonData4, headers = {"Gateway-API-Key":"lN0XSuuwGNNZuoZaVP4KNxpv0xdgbQSs"})
    
                    

        