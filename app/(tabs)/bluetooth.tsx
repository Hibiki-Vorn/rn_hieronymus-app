import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Bluetooth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    alignSelf: "center",
    height: 230,
    width: 230,
  },
  text: {
    color:"#007bff",
    padding: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    bottom: 10
  },
  buttons: {
    color:"#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 14
  }
});
