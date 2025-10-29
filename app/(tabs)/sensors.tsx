import { Accelerometer, Barometer, Gyroscope, Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type SensorType = 'Accelerometer' | 'Gyroscope' | 'Magnetometer' | 'Barometer';

export default () => {
  const [sensorType, setSensorType] = useState<SensorType>('Accelerometer');
  const [data, setData] = useState<any>({});
  const [subscription, setSubscription] = useState<any>(null);

  // 设置传感器更新间隔（ms）
  const UPDATE_INTERVAL = 200;

  const bgColor = (t: string):string => {
    if (t === sensorType) {
      return "#642fc5ff"
    }
    return "#007bff"
  }

  useEffect(() => {
    // 切换传感器时重新订阅
    subscribe(sensorType);
    return () => unsubscribe();
  }, [sensorType]);

  const subscribe = (type: SensorType) => {
    unsubscribe(); // 先取消之前的订阅
    let sub: any;
    switch (type) {
      case 'Accelerometer':
        Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
        sub = Accelerometer.addListener(setData);
        break;
      case 'Gyroscope':
        Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
        sub = Gyroscope.addListener(setData);
        break;
      case 'Magnetometer':
        Magnetometer.setUpdateInterval(UPDATE_INTERVAL);
        sub = Magnetometer.addListener(setData);
        break;
      case 'Barometer':
        Barometer.setUpdateInterval(UPDATE_INTERVAL);
        sub = Barometer.addListener(setData);
        break;
    }
    setSubscription(sub);
  };

  const unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
    setData({});
  };

  const renderData = () => {
    if (sensorType === 'Barometer') {
      return (
        <>
          <Text style={styles.dataText}>Pressure: {data.pressure?.toFixed(2)} hPa</Text>
          <Text style={styles.dataText}>Altitude: {data.relativeAltitude?.toFixed(2)} m</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.dataText}>x: {data.x?.toFixed(2)}</Text>
          <Text style={styles.dataText}>y: {data.y?.toFixed(2)}</Text>
          <Text style={styles.dataText}>z: {data.z?.toFixed(2)}</Text>
        </>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Expo Sensors Demo</Text>
      <View style={styles.buttonRow}>
        {(['Accelerometer', 'Gyroscope', 'Magnetometer', 'Barometer'] as SensorType[]).map((type) => (
          <Pressable key={type} onPress={() => setSensorType(type)}>
            <Text style={[
              styles.buttton, 
              {
                backgroundColor: bgColor(type)
              }]
            }>{type}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.sensorLabel}>{sensorType} Data:</Text>
        {renderData()}
      </View>
      <Button title="Stop Sensor" onPress={unsubscribe} color="red" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    //marginBottom: 30,
  },
  dataContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sensorLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "white",
  },
  dataText: {
    fontSize: 18,
    color: "white",
    textAlign:"left",
    width:"72.5%"
  },
  buttton: {
    alignItems: 'center',
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    fontWeight: "bold",
    width: 130,
    textAlign: 'center'
  },
  head: {
    color:"#007bff",
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    bottom: 20,
  }
});

