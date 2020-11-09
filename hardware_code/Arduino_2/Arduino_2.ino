//Included SoftwareSerial Library
#include <SoftwareSerial.h>
SoftwareSerial xbee = SoftwareSerial(0,1);
//#include <ArduinoJson.h>

//Temperature sensor (DHT22)
#include <Adafruit_Sensor.h>
#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht = DHT(DHTPIN, DHTTYPE);

//DS18B20 Temperature Sensor
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 3 //digital pin 3 on the Arduino
OneWire oneWire(ONE_WIRE_BUS);  // Setup a oneWire instance to communicate with any OneWire device
DallasTemperature sensors(&oneWire); // Pass oneWire reference to DallasTemperature library


//Soil Moisture Sensor Probe
int moisture_pin = A1;
int moisture_value;


// application ID 
char appID[] = "F0";

//node id values ranging from 0 - 65535
int nID = 25; 

//sensor id values ranging from 0 - 255
int tempID = 1;  
int humID = 2;
int tempSoilID = 3;
int moistureID = 4;

// variable to store enviromnetal data
int hum = 0;
int temp = 0;
int moisture_percentage = 0;
int tempSoil = 0;

uint8_t error;



void setup() {
  // Begin the Serial at 115200 Baud
  xbee.begin(115200);
  //DS18B20
  sensors.begin();  
  //DHT22
  dht.begin();
  Serial.begin(115200);
}

void loop() {

  //StaticJsonBuffer<500> jsonBuffer;
  //JsonObject& root = jsonBuffer.parseObject(s);

  //if (root == JsonObject::invalid())
  //{
  //  return;
  //}

  //if(!root.success()) 
  //{
   // Serial.println("parseObject() failed");
  //}

  //DHT22
  // Read the humidity in %:
  hum = dht.readHumidity(); // Read the temperature as Celsius:
  temp = dht.readTemperature(); // Read the temperature as Fahrenheit:
  //float f = dht.readTemperature(true);

  //Serial.print("Temperature Arduino_2: ");
  //Serial.println(temp);
  //Serial.print("Humidity Arduino_2: ");
  //Serial.println(hum);

  //DS18B20
  sensors.requestTemperatures();
  tempSoil = sensors.getTempCByIndex(0);
  //sensors.getTempFByIndex(0) <---- this is for fahrenheit
  //Serial.print("Soil Temperature Arduino_2: ");
  //Serial.println(tempSoil);

  //Soil Moisture
  moisture_value = analogRead(moisture_pin);
  moisture_percentage = ( 100 - ( (moisture_value/1023.00) * 100 ) );
  //Serial.print("Soil Mositure Arduino_2: ");
  //Serial.println(moisture_percentage); 

  byte data[40] = {appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(tempID & 0xFF),(temp >> 16) & 0xFF,(temp >> 8) & 0xFF,temp & 0xFF,0,0,appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(humID & 0xFF),(hum >> 16) & 0xFF,(hum >> 8) & 0xFF,hum & 0xFF,0,0,appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(tempSoilID & 0xFF),(tempSoil >> 16) & 0xFF,(tempSoil >> 8) & 0xFF,tempSoil & 0xFF,0,0, appID[0],appID[1],(nID >> 8) & 0xFF, nID & 0xFF, (moistureID & 0xFF),(moisture_percentage >> 16) & 0xFF, (moisture_percentage >> 8 ) & 0xFF, moisture_percentage & 0xFF,0,0};
  data[8] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF) + (temp & 0xFF)) % 255;
  data[9] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF) + (temp & 0xFF))) % 255;
  data[18] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF) + (hum & 0xFF)) % 255;
  data[19] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF) + (hum & 0xFF))) % 255;
  data[28] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempSoilID & 0xFF) + ((tempSoil >> 16) & 0xFF) + ((tempSoil >> 8) & 0xFF) + (tempSoil & 0xFF)) % 255;
  data[29] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempSoilID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempSoilID & 0xFF) + ((tempSoil >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempSoilID & 0xFF) + ((tempSoil >> 16) & 0xFF) + ((tempSoil >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempSoilID & 0xFF) + ((tempSoil >> 16) & 0xFF) + ((tempSoil >> 8) & 0xFF) + (tempSoil & 0xFF))) % 255;
  data[38] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (moistureID & 0xFF) + ((moisture_percentage >> 16) & 0xFF) + ((moisture_percentage >> 8) & 0xFF) + (moisture_percentage & 0xFF)) % 255;
  data[39] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (moistureID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (moistureID & 0xFF) + ((moisture_percentage >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (moistureID & 0xFF) + ((moisture_percentage >> 16) & 0xFF) + ((moisture_percentage >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (moistureID & 0xFF) + ((moisture_percentage >> 16) & 0xFF) + ((moisture_percentage >> 8) & 0xFF) + (moisture_percentage & 0xFF))) % 255;

  for(int i = 0; i < 40; ++i){
    Serial.write(data[i]);
  }
 
  //delay(10000);
  delay(720000);
}
