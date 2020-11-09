//Arduino code
#include <SoftwareSerial.h>
SoftwareSerial xbee = SoftwareSerial(0,1);

//Temperature sensor (DHT22)
#include <Adafruit_Sensor.h>
#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht = DHT(DHTPIN, DHTTYPE);

//Light Sensor
int lightPin = A2;   
float rawRange = 1024; // 3.3v
float logRange = 5.0; // 3.3v = 10^5 lux

// application ID 
char appID[] = "F0";

//node id values ranging from 0 - 65535
int nID = 35; 

//sensor id values ranging from 0 - 255
int tempID = 1;  
int humID = 2;
int luxID = 3;

// variable to store enviromnetal data
int temp = 0, hum = 0;
int lux = 0;


void setup() {
  
  xbee.begin(115200);

  //DHT22
  dht.begin();
  analogReference(EXTERNAL); 
  Serial.begin(115200);
}

              
 
void loop() {

  //DHT22
  // Read the humidity in %:
  hum = dht.readHumidity();
  // Read the temperature as Celsius:
  temp = dht.readTemperature();
  // Read the temperature as Fahrenheit:
  //float f = dht.readTemperature(true);

  //Light Sensor
  int rawValue = analogRead(lightPin); 
  lux = RawToLux(rawValue); 
   
  //Serial.print("Temperature: ");
  //Serial.println(temp);
  //Serial.print("Humidity: ");
  //Serial.println(hum);
  //Serial.print("Light Index(LuX): ");
  //Serial.println(lux);
  
  byte data[30] = {appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(tempID & 0xFF),(temp >> 16) & 0xFF,(temp >> 8) & 0xFF,temp & 0xFF,0,0,appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(humID & 0xFF),(hum >> 16) & 0xFF,(hum >> 8) & 0xFF,hum & 0xFF,0,0,appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(luxID & 0xFF),(lux >> 16) & 0xFF,(lux >> 8) & 0xFF,lux & 0xFF,0,0};
  data[8] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF) + (temp & 0xFF)) % 255;
  data[9] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF) + (temp & 0xFF))) % 255;
  data[18] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF) + (hum & 0xFF)) % 255;
  data[19] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF) + (hum & 0xFF))) % 255;
  data[28] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF) + ((lux >> 8) & 0xFF) + (lux & 0xFF)) % 255;
  data[29] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF) + ((lux >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF) + ((lux >> 8) & 0xFF) + (lux & 0xFF))) % 255;

  for(int i = 0; i < 30; ++i){
  Serial.write(data[i]);
  }
  
  delay(660000);

}

float RawToLux(int raw)
{
  float logLux = raw * logRange / rawRange;
  return pow(10, logLux);
}
