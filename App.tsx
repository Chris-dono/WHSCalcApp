import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import StrokeplayScreen from './components/StrokeplayScreen';
import PairsScreen from './components/PairsScreen';
import MatchplayScreen from './components/MatchplayScreen';
import ScrambleScreen from './components/ScrambleScreen';

const formats = [
  {key: 'strokeplay', label: 'Individual Strokeplay'},
  {key: 'matchplay', label: 'Matchplay'},
  {key: 'pairs', label: 'Pairs Event'},
  {key: 'scramble', label: 'Team Scramble'},
];

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const backgroundStyle = { backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5' };
  const safePadding = '5%';

  const paperTheme = theme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      {!selectedFormat ? (
        <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', paddingHorizontal: safePadding }}>
              <Text style={styles.title}>Golf Handicap Calculator</Text>
              <Text style={styles.subtitle}>Select Format:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
                <Button mode={theme === 'light' ? 'contained' : 'outlined'} onPress={() => setTheme('light')} style={{ marginRight: 8 }}>
                  Light Theme
                </Button>
                <Button mode={theme === 'dark' ? 'contained' : 'outlined'} onPress={() => setTheme('dark')}>
                  Dark Theme
                </Button>
              </View>
              {formats.map(f => (
                <Button key={f.key} mode="contained" onPress={() => setSelectedFormat(f.key)} style={{ marginVertical: 8 }}>
                  {f.label}
                </Button>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
          {selectedFormat === 'strokeplay' && (
            <StrokeplayScreen onBack={() => setSelectedFormat(null)} />
          )}
          {selectedFormat === 'pairs' && (
            <PairsScreen onBack={() => setSelectedFormat(null)} />
          )}
          {selectedFormat === 'matchplay' && (
            <MatchplayScreen onBack={() => setSelectedFormat(null)} />
          )}
          {selectedFormat === 'scramble' && (
            <ScrambleScreen onBack={() => setSelectedFormat(null)} />
          )}
        </SafeAreaView>
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
});
