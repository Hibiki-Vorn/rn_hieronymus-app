// GPSExample.tsx
import * as Location from 'expo-location';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GPSExample() {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [watching, setWatching] = useState(false);
    const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

    // Get location once
    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Location permission denied');
        return;
        }

        const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        });
        setLocation(loc);
    };

    // Start or stop watching
    const toggleWatching = async () => {
        if (!watching) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Location permission denied');
            return;
        }

        const sub = await Location.watchPositionAsync(
            {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // update every second
            distanceInterval: 1, // update every 1 meter
            },
            (loc) => setLocation(loc)
        );

        subscriptionRef.current = sub;
        setWatching(true);
        } else {
        subscriptionRef.current?.remove();
        subscriptionRef.current = null;
        setWatching(false);
        }
    };

    let text = 'No location data';
    if (errorMsg) text = errorMsg;
    else if (location)
        text = `Latitude: ${location.coords.latitude.toFixed(6)}\nLongitude: ${location.coords.longitude.toFixed(6)}`;

    return (
        <View style={styles.container}>
            <Text style={styles.head}>GPS tool</Text>
            <Pressable style={styles.button} onPress={getLocation}>
                <Text style={styles.emoji}>📍</Text>
                <Text style={styles.label}>Get Current    </Text>
            </Pressable>

            <Pressable
                style={[styles.button, watching && styles.activeButton]}
                onPress={toggleWatching}
            >
                <Text style={styles.emoji}>
                {watching ? '🛑' : '▶️'}
                </Text>
                <Text style={styles.label}>
                {watching ? 'Stop Watching' : 'Start Watching'}
                </Text>
            </Pressable>

            <Text selectable style={styles.text}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151718',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        flexDirection: 'row',       // 横向排列
        alignItems: 'center',       // 垂直居中
        justifyContent: 'space-between', // 两端对齐
        backgroundColor: '#007bff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
        borderRadius: 10,
        width: 200,                 // 固定宽度，方便布局
    },
    emoji: {
        fontSize: 24,
    },
    label: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeButton: {
        backgroundColor: '#ff4444',
    },
    text: {
        marginTop: 30,
        color: '#00e0ff',
        fontSize: 18,
        textAlign: 'center',
    },
    head: {
        color:"#007bff",
        marginTop: 30,
        marginLeft: 15,
        fontSize: 30,
        textAlign: "left",
        fontWeight: "bold",
        bottom: 10,
    }
});

