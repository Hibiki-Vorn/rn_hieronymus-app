import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <Image
          source={require('@/assets/images/index-logo.png')}
          style={styles.reactLogo}
        />
      <Text style={styles.text}>Hieronymus's App</Text>
      <Link href='/explore'>
        <View>
          <Text style={styles.buttons}>Open App Now</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
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
    bottom: 10,
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
