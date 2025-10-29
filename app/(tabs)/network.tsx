import Slider from '@react-native-community/slider';
import * as Network from 'expo-network';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
    const [ip, setIp] = useState<string | null>(null);
    const [networkType, setNetworkType] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [speed, setSpeed] = useState<number>(0);
    const [testing, setTesting] = useState<boolean>(false);

    const [rate, setRate] = useState(1.0);
    const [pitch, setPitch] = useState(1.0);
    const [volume, setVolume] = useState(1.0);

    useEffect(() => {
        fetchNetworkInfo();
    }, []);

    const fetchNetworkInfo = async () => {
        const state = await Network.getNetworkStateAsync();
        setIp(await Network.getIpAddressAsync());
        setNetworkType(state.type ?? 'UNKNOWN');
        setIsConnected(state.isConnected ?? false);
    };

    const testSpeed = async () => {
        setTesting(true);
        setSpeed(0);
        const fileUrl = 'https://hieronymus-toolbox.pages.dev/assets/favicon-Bdd-wWIa.svg'; // 小文件模拟网速
        let totalBytes = 0;
        const startTime = Date.now();

        for (let i = 0; i < 5; i++) { // 连续下载 5 次模拟测速
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            totalBytes += blob.size;
            const elapsed = (Date.now() - startTime) / 1000; // 秒
            const kbps = (totalBytes * 8) / 1024 / elapsed;
            setSpeed(kbps);
        } catch (err) {
            console.log('Download error:', err);
            setSpeed(0);
            break;
        }
        }

        setTesting(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.head}>Network Infomation</Text>

        <Text style={styles.text}>IP Address: {ip}</Text>
        <Text style={styles.text}>Network Type: {networkType}</Text>
        <Text style={styles.text}>Connected: {isConnected ? 'Yes' : 'No'}</Text>

        <Button title="Refresh Network Info" onPress={fetchNetworkInfo} />
        <View style={{ marginVertical: 10 }} />
        <Button title={testing ? 'Testing...' : 'Test Download Speed'} onPress={testSpeed} disabled={testing} />
        <View style={{ height: 20 }} />
        <View style={styles.speedBarBackground}>
            <View style={[styles.speedBarFill, { width: `${Math.min(speed / 2000 * 100, 100)}%` }]} />
        </View>
        <View>

        
        <Text style={styles.text}>Speed: {speed.toFixed(2)} kbps</Text>

        {/* Speech 滑条控制 */}
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
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: "center"
    },
    head: {
        color: '#007bff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
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
    speedBarBackground: {
        width: '80%',
        height: 20,
        backgroundColor: '#444',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    speedBarFill: {
        height: '100%',
        backgroundColor: '#007bff',
    },
});
