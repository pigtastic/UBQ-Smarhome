#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>

//Wifi Credentials
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

// Raspberri Pi Gaia MQTT Broker
#define MQTT_HOST IPAddress(192, 168, 2, 104)
#define MQTT_PORT 1883

//#define DEVICE_NAME

// Temperature and Discovery MQTT Topics
#define MQTT_TOPIC_TEMP "gaia/ds18b20/temperature"
#define MQTT_TOPIC_DISCOVERY "gaia/discovery/dsb18b20/config"

// GPIO where the DS18B20 is connected to
const int oneWireBus = 4;          
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;


// Temperature value
float temp;
// Time values
unsigned long previousMillis = 0;   
const long interval = 10000;       

void connectToWifi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Connected to Wi-Fi.");
  connectToMqtt();
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Disconnected from Wi-Fi.");
  mqttReconnectTimer.detach();
  wifiReconnectTimer.once(2, connectToWifi);
}

void connectToMqtt() {
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

void onMqttConnect(bool sessionPresent) {
  Serial.println("Connected to MQTT.");
  mqttClient.publish(MQTT_TOPIC_DISCOVERY, 1, true, "{\"topic\":\"gaia/ds18b20/temperature\"}");
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected()) {
    mqttReconnectTimer.once(2, connectToMqtt);
  }
}

void setup() {
  sensors.begin();
  Serial.begin(115200);
  Serial.println();
  
  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  
  connectToWifi();
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    
    previousMillis = currentMillis;
    sensors.requestTemperatures(); 
    temp = sensors.getTempCByIndex(0);

    
    // Publish an MQTT message on topic gaia/ds18b20/temperature
    uint16_t packetIdPub1 = mqttClient.publish(MQTT_TOPIC_TEMP, 1, true, String(temp).c_str());                            
    Serial.printf("Publishing on topic %s, packetId: %i ", MQTT_TOPIC_TEMP, packetIdPub1);
    Serial.printf("Message: %.2f \n", temp);
  }
}
