import Constants, { ExecutionEnvironment } from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import NfcManager, { NdefRecord, NfcEvents, TagEvent } from 'react-native-nfc-manager';

export default function AutoReadNFC() {
  const [tag, setTag] = useState<TagEvent | null>(null);

  useEffect(() => {
    async function initNFC() {
      if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
        ToastAndroid.show(
          `Running in ${Constants.executionEnvironment} – NFC not available`,
          ToastAndroid.LONG
        );
        return;
      }

      try {
        const supported = await NfcManager.isSupported();
        if (!supported) {
          ToastAndroid.show('NFC not supported', ToastAndroid.LONG);
          return;
        }

        await NfcManager.start();
        ToastAndroid.show('Good! NFC supported', ToastAndroid.LONG);

        const enabled = await NfcManager.isEnabled();
        if (!enabled) {
          Alert.alert(
            'NFC did not turn on',
            'Please turn on NFC in system setting.',
            [
              {
                text: 'Goto turn on',
                onPress: () => {
                  if (Platform.OS === 'android') {
                    Linking.openSettings();
                  }
                },
              },
              { text: 'Cancel', style: 'cancel' },
            ]
          );
        }

        NfcManager.setEventListener(NfcEvents.DiscoverTag, (newTag: TagEvent) => {
          console.log('Tag detected:', newTag);
          setTag(newTag);

          if (newTag.ndefMessage && newTag.ndefMessage.length > 0) {
            const ndefRecord: NdefRecord = newTag.ndefMessage[0];
            const text = new TextDecoder().decode(ndefRecord.payload as any);
            Alert.alert('Tag Detected', `Content: ${text}`);
          }

          NfcManager.unregisterTagEvent().catch(() => {});
        });

        await NfcManager.registerTagEvent({
          alertMessage: 'Ready to scan NFC tag...',
        });
      } catch (err) {
        console.warn('NFC init failed:', err);
        ToastAndroid.show('NFC initialization failed', ToastAndroid.LONG);
      }
    }

    initNFC();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => {});
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📶 Auto NFC Reader</Text>
      {tag ? (
        <Text selectable style={styles.text}>
          Last Tag: {JSON.stringify(tag, null, 2)}
        </Text>
      ) : (
        <Text style={styles.text}>Bring an NFC tag close to the device</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'black', 
    padding: 20 
  },
  title: { 
    fontSize: 22, 
    color: '#00e0ff', 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  text: { 
    color: '#aaa', 
    fontSize: 16, 
    textAlign: 'center' 
  },
});
