#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266Firebase.h>
#include <DHT.h>

#define DATABASE_URL "https://samrt-garden-and-agriculture-default-rtdb.firebaseio.com"
#define DHTPIN 2               // D4 pin for DHT sensor
#define DHTTYPE DHT11          // DHT 11 sensor type
#define MOTOR_PIN 5            // D1 pin for motor control
#define SOIL_MOISTURE_PIN A0   // Analog pin for soil moisture sensor
#define MOISTURE_THRESHOLD 35  // Moisture level threshold
#define WIFI_SSID "Airtel_Kinsuksingh1"
#define WIFI_PASSWORD "Singh65rewq"

Firebase firebase(DATABASE_URL);
WiFiClient client;
DHT dht(DHTPIN, DHTTYPE);

int day = 0;
int hourVal = 0;

// WiFi connection setup
void connectToWiFi() {
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected! IP address: " + WiFi.localIP().toString());
}

// Fetch and update last time from Firebase
bool fetchLastTimeFromFirebase() {
    day = firebase.getInt("/lastTime/day");
    hourVal = firebase.getInt("/lastTime/hour");

    if (day < 0 || hourVal < 0 || hourVal >= 24) {
        Serial.println("Failed to fetch time from Firebase, resetting to 0.");
        day = 0;
        hourVal = 0;
        return false;
    }
    
    Serial.printf("Fetched Day: %d, Hour: %d\n", day, hourVal);
    return true;
}

void updateLastTimeInFirebase() {
    firebase.setInt("/lastTime/day", day);
    firebase.setInt("/lastTime/hour", hourVal);
}

// Read sensors and control motor
void readSensorsAndControlMotor() {
    int moistureValue = analogRead(SOIL_MOISTURE_PIN);
    float moisturePercentage = map(moistureValue, 0, 1023, 100, 0);
    
    float temp = dht.readTemperature();
    float humidity = dht.readHumidity();
    
    if (isnan(temp) || isnan(humidity)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    Serial.printf("Temperature: %.2f °C, Humidity: %.2f %%\n", temp, humidity);
    Serial.printf("Soil Moisture: %.2f %%\n", moisturePercentage);

    String readingsPath = "day" + String(day) + "/hour_" + String(hourVal);
    firebase.setInt(readingsPath + "/SoilMoisture", moisturePercentage);
    firebase.setString(readingsPath + "/Temperature", String(temp) + " °C");
    firebase.setString(readingsPath + "/Humidity", String(humidity) + " %");

    // Control motor based on moisture level
    if (moisturePercentage < MOISTURE_THRESHOLD) {
        digitalWrite(MOTOR_PIN, HIGH); // Turn on motor
    } else {
        digitalWrite(MOTOR_PIN, LOW);  // Turn off motor
    }
}

// Define pin modes
void setupPins() {
    pinMode(SOIL_MOISTURE_PIN, INPUT);
    pinMode(MOTOR_PIN, OUTPUT);
}

// Main setup
void setup() {
    Serial.begin(115200);
    dht.begin();
    connectToWiFi();
    setupPins();

    // Initialize last time in Firebase if fetch fails
    if (!fetchLastTimeFromFirebase()) {
        firebase.setInt("/lastTime/day", day);
        firebase.setInt("/lastTime/hour", hourVal);
    }
}



unsigned long previousMillis = 0; // Stores the last time the action was performed
const unsigned long interval = 60 * 1000; // 1 minute in milliseconds
int minutes = 0; // Initialize minutes

void loop() {
    unsigned long currentMillis = millis(); // Get the current time

    // Check if a minute has passed
    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis; // Update the last action time
        minutes++;

        // Check if one hour has passed
        if (minutes >= 60) {
            minutes = 0; // Reset minutes to 0
            Serial.println("\nReading Cycle: " + String(day * 24 + hourVal));

            // Read sensors and control motor
            readSensorsAndControlMotor();

            // Increment hour and check for new day
            hourVal++;
            if (hourVal >= 24) {
                hourVal = 0;
                day++;
                Serial.println("New day incremented: " + String(day));
            }

            // Update the last time in Firebase
            updateLastTimeInFirebase();
        }
    }
}












































































































































































































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
