import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.safeArea}>
    <ThemeProvider value={DarkTheme}>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(tabs)"/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider></SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black', // 全局背景色
  },
});
