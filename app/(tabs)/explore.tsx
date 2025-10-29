import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BoxGrid() {
  return (
    <>
      <Text style={styles.text}>Explore</Text>
      <View style={styles.container}>
        <View style={styles.box} >
          <Link href="/nfc">
            <View>
              <Text style={styles.buttons}>NFC</Text>
            </View>
          </Link>
        </View>
        <View style={styles.box} >
          <Link href="/gps">
            <View>
              <Text style={styles.buttons}>GPS</Text>
            </View>
          </Link>
        </View>
        <View style={styles.box} >
          <Link href="/sensors">
            <View>
              <Text style={styles.buttons}>Sensors</Text>
            </View>
          </Link>
        </View>
        <View style={styles.box} >
          <Link href="/speech">
            <View>
              <Text style={styles.buttons}>Speech</Text>
            </View>
          </Link>
        </View>
        <View style={styles.box} >
          <Link href="/network">
            <View>
              <Text style={styles.buttons}>Network</Text>
            </View>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 10,
  },
  box: {
    margin: 8,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  buttons: {
    color:"#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 14
  },
  text: {
    color:"#007bff",
    marginTop: 30,
    marginLeft: 15,
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    bottom: 10,
  }
});
