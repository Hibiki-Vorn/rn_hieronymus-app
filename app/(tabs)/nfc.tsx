import Constants, { ExecutionEnvironment } from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import NfcManager, { NdefRecord, NfcEvents, TagEvent } from 'react-native-nfc-manager';

export default function AutoReadNFC() {
  const [tag, setTag] = useState<TagEvent | null>(null);

  useEffect(() => {

    if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
      NfcManager.isSupported()
        .then(supported => {
          if (supported) {
            NfcManager.start();
            ToastAndroid.show('Good! NFC supported', ToastAndroid.LONG);
          } else {
            ToastAndroid.show('NFC not supported', ToastAndroid.LONG);
          }
        })
        .catch(err => ToastAndroid.show('NFC check failed', ToastAndroid.LONG));
    } else {
      ToastAndroid.show(`Running in ${Constants.executionEnvironment} – NFC not available`, ToastAndroid.LONG);
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

    NfcManager.registerTagEvent({
      alertMessage: 'Ready to scan NFC tag...',
    }).catch(console.warn);

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
