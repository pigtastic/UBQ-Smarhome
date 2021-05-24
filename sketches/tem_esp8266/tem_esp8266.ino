#include <ESP8266WiFi.h>

#include <PubSubClient.h>

#include <OneWire.h>

#include <DallasTemperature.h>

const char * ssid = "";
const char * password = "";
const char * mqtt_server = "";

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
float temp = 0;
int inPin = 5;
void setup_wifi() {
    delay(10);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}
void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        if (client.connect("arduinoClient_temperature_sensor")) {
            Serial.println("connected");
        } else {
            Serial.println(" try again in 5 seconds");
            client.setServer(mqtt_server, 1883);
            pinMode(inPin, INPUT);
            sensors.begin();
        }
    }
}
void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();
    long now = millis();
    if (now - lastMsg > 60000) {
        lastMsg = now;
        sensors.setResolution(12);
        temperatures temp = sensors.getTempCByIndex(0);
        Serial.println(temp);
        if ((temp > -20) & (temp < 60)) {
            client.publish("ha/_temperature1", String(temp).c_str(), TRUE);
        }
    }
}
