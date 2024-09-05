#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266Firebase.h>
#include <DHT.h>
#include <String.h>


// Wi-Fi credentials (replace with your network SSID and password)
const char* ssid = "Airtel_Kinsuksingh1";
const char* password = "Singh65rewq";

#define DATABASE_URL "https://smart-agriculture-27cf2-default-rtdb.firebaseio.com"
Firebase firebase(DATABASE_URL);
WiFiClient client;

void wifiConnecting() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  // More informative connection status messages
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.println("Connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void setSensorsDataOnFirebase(int temp, int humidity, float moisture, bool rainStatus, int phLevel, int day, int id, int readingCount) {
  // Construct a clear path for sensor data within your Firebase database structure
  String dataPath = "sensors-data/sensor-data";
  dataPath += String(readingCount);

  // Set sensor data to Firebase using setString and setInt
  firebase.setString(dataPath + "/temperature", String(temp));
  firebase.setString(dataPath + "/humidity", String(humidity));
  firebase.setString(dataPath + "/soilMoisture", String(moisture));
  firebase.setString(dataPath + "/rainStatus", rainStatus ? "true" : "false");
  firebase.setString(dataPath + "/phLevel", String(phLevel));
  firebase.setString(dataPath + "/id", String(id));
  firebase.setString(dataPath + "/day", String(day));
  firebase.setString(dataPath + "/readingCount", String(readingCount));
}

int day = 1;
int id = 1;
int readingCount = 1;
#define DHTPIN 2 // D4 Pin connected to the DHT sensor (change if needed)
#define DHTTYPE DHT11 // DHT 11 sensor model (or DHT22 for different model)
int sensorPin = A0; // Analog pin connected to soil moisture sensor
const int motorPin = 5; // D1, pin on esp8266 Digital pin connected to motor control (replace with actual pin)
const int moistureThreshold = 35; // Moisture level below which motor turns on
DHT dht(DHTPIN, DHTTYPE);
int rainSensorDigital = 16; // D0, Digital pin for rain sensor (optional)


void definePinMode() {
  pinMode(rainSensorDigital, INPUT);
  pinMode(sensorPin, INPUT);
  pinMode(motorPin, OUTPUT);
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  wifiConnecting();
  definePinMode();
}

void loop() {
  // int temp = dht.readTemperature();
  // int humidity = dht.readHumidity();
  // int sensorValue = analogRead(sensorPin);
  // float moisture = map(sensorValue, 0, 1023, 100, 0); // Map from 0-1023 to 100-0 (wet-dry)
  // bool rainStatus = digitalRead(rainSensorDigital);
  // int phLevel = 7; // Replace with actual pH sensor reading (if connected)

  int temp = 34;
  int humidity = 4;
  float moisture =50; // Map from 0-1023 to 100-0 (wet-dry)
  bool rainStatus = 1;
  int phLevel = 7; // Replace with actual pH sensor reading (if connected)

  // Send sensor data to Firebase
  if(readingCount==24){
    readingCount=1;
    day++;
  }
  
  setSensorsDataOnFirebase(temp, humidity, moisture, rainStatus, phLevel, day, id, readingCount);
  id++;
  readingCount++;

  // Simplified motor control based on moisture threshold
  digitalWrite(motorPin, moisture < moistureThreshold ? HIGH : LOW);

  delay(2000);
}
