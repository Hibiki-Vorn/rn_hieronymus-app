import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);

  const speak = () => {
    Speech.speak(text, {
      rate,
      pitch,
      volume,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Speech</Text>

      {/* 提示语 + Speak按钮 */}
      <View style={styles.row}>
        <Text style={styles.text}>Enter what you want to speak</Text>
        <Pressable onPress={speak} style={({ pressed }) => [styles.button, pressed && styles.activeButton]}>
          <Text style={styles.buttonText}>Speak</Text>
        </Pressable>
      </View>

      {/* 输入框 */}
      <TextInput
        multiline
        style={styles.input}
        onChangeText={setText}
        value={text}
        textAlignVertical="top"
        placeholder="Type here..."
        placeholderTextColor="#ccc"
      />

      {/* Rate 滑条 */}
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

      {/* Pitch 滑条 */}
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

      {/* Volume 滑条 */}
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
    justifyContent: "center",
    backgroundColor: 'black',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '85%', // 保持提示文字 + 按钮行占屏幕宽度约85%
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
    width: '80%', // 控制滑条行占宽 80%
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
    color: "#007bff",
    marginTop: 30,
    marginLeft: 15,
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: 'flex-start',
  }
});
