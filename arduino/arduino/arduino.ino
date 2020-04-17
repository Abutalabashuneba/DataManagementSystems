#include <ArduinoJson.h>
#include<SoftwareSerial.h>
#define rxPin 5
#define txPin 6
SoftwareSerial s =  SoftwareSerial(rxPin, txPin);

//Temperature sensor (DHT11)
#include <dht.h>
#define sensorPin A0
dht DHT;

//Moisture
#define moisturePin A1

void setup() {
  // put your setup code here, to run once:
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  
  s.begin(115200);
  Serial.begin(115200);
}

StaticJsonBuffer<1000> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

void loop() {
 
  //DHT11
  DHT.read11(sensorPin);
  int t = DHT.temperature;
  int h = DHT.humidity;

  //Moisture
  int m = analogRead(moisturePin);
  

  if (isnan(h) || isnan(t) || isnan(m)) {
    return;
  }

  root["temp"] = t;
  root["hum"] = h;
  root["mois"] = m;

  Serial.print(s.available());
  if(s.available()>0)
  {
    root.printTo(s);
  }

  int data1=root["temp"];
  int data2=root["hum"];
  int data3=root["mois"];
 
  //---show temp and humidity as integers on Serial moniotr
  Serial.print("Temperature = "); Serial.print(data1); Serial.print(" °C");
  Serial.print("  ");  //space
  Serial.print("Humidity = "); Serial.print(data2); Serial.println(" %H");
  Serial.println("");
  Serial.print("Moisture = "); Serial.println(data3); 
 
  
  delay(3000);
}
