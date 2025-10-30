import { Accelerometer, Barometer, Gyroscope, Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type SensorType = 'Accelerometer' | 'Gyroscope' | 'Magnetometer' | 'Barometer' | null;

export default () => {
  const [sensorType, setSensorType] = useState<SensorType>(null);
  const [data, setData] = useState<any>({});
  const [subscription, setSubscription] = useState<any>(null);

  const UPDATE_INTERVAL = 200;

  const bgColor = (t: SensorType):string => {
    if (t === sensorType) {
      return "#642fc5ff"
    }
    return "#007bff"
  }

  useEffect(() => {
    subscribe(sensorType);
    return () => unsubscribe();
  }, [sensorType]);

  const subscribe = (type: SensorType) => {
    unsubscribe();
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
    }
    if (sensorType !== null) {
      return (
        <>
          <Text style={styles.dataText}>x: {data.x?.toFixed(2)}</Text>
          <Text style={styles.dataText}>y: {data.y?.toFixed(2)}</Text>
          <Text style={styles.dataText}>z: {data.z?.toFixed(2)}</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.dataText}>Please select a sensor</Text>
        </>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text style={styles.head}>Sensors</Text>
        {(()=>{
          if (sensorType !== null) {
            return (
              <Pressable style={styles.stopBttton} onPress={()=>{unsubscribe();setSensorType(null)}}>
                <Text style={styles.text}>Stop Sensor</Text>
              </Pressable>
            )
          }else {
            return <></>
          }
        })()}
      </View>
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
  },
  dataContainer: {
    marginBottom: 30,
    width: "70%"
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
    marginLeft: 10,
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
  stopBttton: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    fontWeight: "bold",
    width: 110,
    textAlign: 'center',
    backgroundColor: "red",
    height: 44,
  },
  head: {
    color:"#007bff",
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    bottom: 20,
    paddingTop: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
    width: '85%',
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 10,
  },
});

