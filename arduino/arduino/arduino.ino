#include <ArduinoJson.h>
#include<SoftwareSerial.h>
#include "GA1A12S202.h"
#define rxPin 5
#define txPin 6
SoftwareSerial s =  SoftwareSerial(rxPin, txPin);

//Temperature sensor (DHT11)
#include <dht.h>
#define sensorPin A0
dht DHT;

//Moisture
int moisture_pin = A1;
int output_value ;

//Light Sensor
GA1A12S202 luxValue(A2);


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
  output_value = analogRead(moisture_pin);
  output_value = map(output_value, 1023, 165, 0, 100);
  int m = output_value;

  //Light 
  int l = luxValue.getLux();

  if (isnan(h) || isnan(t) || isnan(m) || isnan(l)) {
    return;
  }

  root["temp"] = t;
  root["hum"] = h;
  root["mois"] = m;
  root["light"] = l;

  Serial.print(s.available());
  if(s.available()>0)
  {
    root.printTo(s);
  }

  int data1=root["temp"];
  int data2=root["hum"];
  int data3=root["mois"];
  int data4=root["light"];
 
  //---show temp and humidity as integers on Serial moniotr
  Serial.print("Temperature = "); Serial.print(data1); Serial.print(" °C");
  Serial.print("  ");  //space
  Serial.print("Humidity = "); Serial.print(data2); Serial.println(" %H");
  Serial.println("");
  Serial.print("Moisture = "); Serial.println(data3); 
  Serial.println("");
  Serial.print("Light = "); Serial.println(data4);Serial.println(" lux"); 
 
  
  delay(3000);
}
