/*
    ------ Waspmote Pro Code Example --------

    Explanation: This is the basic Code for Waspmote Pro

    Copyright (C) 2016 Libelium Comunicaciones Distribuidas S.L.
    http://www.libelium.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Put your libraries here (#include ...)
#include <WaspSensorAgr_v30.h>
#include <WaspXBee900HP.h>
#include <WaspFrame.h>

// Destination MAC address
//////////////////////////////////////////
char RX_ADDRESS[] = "0013A20041913024";
//////////////////////////////////////////

// application ID 
char appID[] = "F0";
//node id values ranging from 0 - 65535
int nID = 15; 
//sensor id values ranging from 0 - 255
int tempID = 1;  
int humID = 2;
int luxID = 3;
// variable to store enviromnetal data
int temp = 0, hum = 0, pres = 0;
uint32_t lux = 0;

uint8_t error;

void setup()
{
  // put your setup code here, to run once:
  USB.ON();
  USB.println(F("Sending packets example"));

  frame.setID("Libelum");

  xbee900HP.ON();
}


void loop()
{
  // put your main code here, to run repeatedly:
  temp = Agriculture.getTemperature();
  hum = Agriculture.getHumidity();
  lux = Agriculture.getLuxes(INDOOR);
  
  
  uint8_t data[30] = {appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(tempID & 0xFF),(temp >> 16) & 0xFF,(temp >> 8) & 0xFF,temp & 0xFF,0,0,appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(humID & 0xFF),(hum >> 16) & 0xFF,(hum >> 8) & 0xFF,hum & 0xFF,0,0,appID[0],appID[1],(nID >> 8) & 0xFF,nID & 0xFF,(luxID & 0xFF),(lux >> 16) & 0xFF,(lux >> 8) & 0xFF,lux & 0xFF,0,0};
  data[8] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF) + (temp & 0xFF)) % 255;
  data[9] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (tempID & 0xFF) + ((temp >> 16) & 0xFF) + ((temp >> 8) & 0xFF) + (temp & 0xFF))) % 255;
  data[18] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF) + (hum & 0xFF)) % 255;
  data[19] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (humID & 0xFF) + ((hum >> 16) & 0xFF) + ((hum >> 8) & 0xFF) + (hum & 0xFF))) % 255;
  data[28] = (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF) + ((lux >> 8) & 0xFF) + (lux & 0xFF)) % 255;
  data[29] = (appID[0] + (appID[0] + appID[1]) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF) + ((lux >> 8) & 0xFF)) + (appID[0] + appID[1] + ((nID >> 8) & 0xFF) + (nID & 0xFF) + (luxID & 0xFF) + ((lux >> 16) & 0xFF) + ((lux >> 8) & 0xFF) + (lux & 0xFF))) % 255;
  error = xbee900HP.send(RX_ADDRESS,data,30);

  USB.println(temp);
  USB.println(hum);
  USB.println(lux);

  if(error == 0){
    USB.println(F("send ok"));

    Utils.blinkGreenLED();
  }

  else{
    USB.println(F("send error"));

    Utils.blinkRedLED();
  }

  USB.print(PWR.getBatteryLevel(),DEC);

  delay(600000);
}
