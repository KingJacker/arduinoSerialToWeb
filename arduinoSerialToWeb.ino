#include <ResponsiveAnalogRead.h>


const int ANALOG_PIN = 0;
ResponsiveAnalogRead analog(ANALOG_PIN, true);

int rawValue = 0;
int responsiveValue = 0;
int prevValue = 0;


void setup() {
  Serial.begin(9600);
}

void loop() {
  analog.update();

  rawValue = round(analogRead(analog.getRawValue()));

  responsiveValue = round(analogRead(analog.getValue()));


  // if(analog.hasChanged()) {
  //   Serial.print("\tchanged");
  // }

  if(rawValue != prevValue){
    prevValue = rawValue;
    
    Serial.print(rawValue);
    Serial.print("\t");
    Serial.print(responsiveValue);
    Serial.println();

  }

  delay(100);

}
