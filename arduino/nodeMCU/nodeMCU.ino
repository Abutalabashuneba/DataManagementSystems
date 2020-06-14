//Firebase library
#include <Firebase.h>  
#include <FirebaseArduino.h>  
#include <FirebaseCloudMessaging.h>  
#include <FirebaseError.h>  
#include <FirebaseHttpClient.h>  
#include <FirebaseObject.h>  
#include <ESP8266WiFi.h>  
#include <FirebaseArduino.h>  

//Included SoftwareSerial Library
#include <SoftwareSerial.h>
SoftwareSerial s(D6,D5);
#include <ArduinoJson.h>

//Configuration for firebase and wifi
#define WIFI_SSID "vince_2.4GHz"
#define WIFI_PASSWORD "0168783220abc"
#define FIREBASE_HOST "test-9ff56.firebaseio.com"
#define FIREBASE_AUTH "tgkqUBUFNNVDRTngezNjv1OOmwnyv5PCCLYhSCSK"

//Moisture
#define soilWet 500 
#define soilDry 750 



void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200); //enable Serial Monitor
  s.begin(115200); //enable SUART Port
  while(!Serial) continue;
  
  //Connect WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                     //try to connect with wifi
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
  Serial.print(".");
  delay(500);
  }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());                                            //print local IP address
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}

void loop() {
  // put your main code here, to run repeatedly:
  //Print the data in the serial monitor
  StaticJsonBuffer<500> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(s);

  if (root == JsonObject::invalid())
  {
    return;
  }

  if(!root.success()) 
  {
    Serial.println("parseObject() failed");
  }

  Serial.println("JSON received and parsed");
  root.prettyPrintTo(Serial);
  Serial.println();
  Serial.print("Temperature ");
  int data1=root["temp"];
  Serial.println(data1);
  Serial.print("Humidity    ");
  int data2=root["hum"];
  Serial.println(data2);
  Serial.print("Moisture    ");
  int data3=root["mois"];
  Serial.println(data3);
  Serial.println(); 
  int data4=root["light"];
  Serial.println(data4);
  Serial.println(); 
 
  // Push json Object to Firebase ------------------------------------------------
  DynamicJsonBuffer jsonBuffer2;
  JsonObject& dataObject = jsonBuffer2.createObject();
  JsonObject& tempTime = dataObject.createNestedObject("timestamp");

  //Read status from firebase
  String dht11Status = Firebase.getString("/Sensors/Chicken/Area1/DHT11/Status");
  String fc28Status = Firebase.getString("/Sensors/Chicken/Area1/FC28/Status");
  
  Serial.print(dht11Status);
  if(dht11Status == "On"){
    dataObject["temperature"] = data1;
    dataObject["humidity"] = data2;
    }
  else if(dht11Status == "Off"){
    dataObject["temperature"] = "undefined";
    dataObject["humidity"] = "undefined";
    }
    
  Serial.print(fc28Status);
  if(fc28Status == "On"){
    dataObject["moisture"] = data3;
  }
  else if(fc28Status == "Off"){
    dataObject["moisture"] = "undefined";
    }
  
  tempTime[".sv"] = "timestamp";
  
  Firebase.push("Data/Chicken/Area1", dataObject);
  
  // handle error  
  if (Firebase.failed()) {  
      Serial.print("pushing /DHT11 failed:");  
      Serial.println(Firebase.error());    
      return;  
  }

  //Delay 5 minutes
  delay(60000);
}
