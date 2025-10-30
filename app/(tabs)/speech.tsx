import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import {
  Alert,
  AlertButton,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

let ttsReady = false;

(async () => {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const validVoices =
      Array.isArray(voices) && voices.length > 0 && voices.every(v => v?.identifier);

    if (!validVoices) {
      showTtsMissingAlert();
      ttsReady = false
    } else {
      ttsReady = true
    }
  } catch (e) {
    console.warn('TTS check failed:', e);
    ttsReady = false
  }
})()

function showTtsMissingAlert() {
  const buttons: AlertButton[] = [{ text: 'OK', style: 'cancel' }];

  if (Platform.OS === 'android') {
    buttons.unshift({
      text: 'Install Google TTS',
      onPress: () =>
        Linking.openURL('market://details?id=com.google.android.tts').catch(() =>
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.google.android.tts'
          )
        ),
    });
  }

  Alert.alert(
    'TTS engine not detected',
    'Please install or check system setting',
    buttons
  );
}


export default function App() {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);

  const speak = () => {
    if (!ttsReady) {
      showTtsMissingAlert();
      return;
    }

    if (!text.trim()) {
      Alert.alert('Please enter what you want to speak');
      return;
    }

    try {
      Speech.speak(text, {
        rate,
        pitch,
        volume,
        onError: (err) => console.warn('Speech Error:', err),
      });
    } catch (e) {
      Alert.alert('Speak failed', `An error ocured: ${String(e)}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Speech</Text>

      <View style={styles.row}>
        <Text style={styles.text}>Enter what you want to speak</Text>
        <Pressable
          onPress={speak}
          style={({ pressed }) => [styles.button, pressed && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Speak</Text>
        </Pressable>
      </View>

      <TextInput
        multiline
        style={styles.input}
        onChangeText={setText}
        value={text}
        textAlignVertical="top"
        placeholder="Type here..."
        placeholderTextColor="#ccc"
      />

      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>Rate: {rate.toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.0}
          maximumValue={2.0}
          step={0.1}
          value={rate}
          onValueChange={setRate}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#ccc"
        />
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>Pitch: {pitch.toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={2.0}
          step={0.1}
          value={pitch}
          onValueChange={setPitch}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#ccc"
        />
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>Volume: {volume.toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.0}
          maximumValue={1.0}
          step={0.05}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#ccc"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '85%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    flexShrink: 1,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: '#0056b3',
  },
  input: {
    color: '#fff',
    backgroundColor: '#ffffff4b',
    width: '85%',
    height: 150,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  sliderLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
    width: 80,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  head: {
    color: '#007bff',
    marginTop: 30,
    marginLeft: 15,
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});
