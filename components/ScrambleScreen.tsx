import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CourseTeePicker from './CourseTeePicker';

export default function ScrambleScreen({ onBack }: { onBack: () => void }) {
  const [numPlayers, setNumPlayers] = useState(4);
  const [players, setPlayers] = useState([
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
  ]);
  const [result, setResult] = useState<string | null>(null);

  const handlePlayerChange = (idx: number, field: string, value: string) => {
    setPlayers(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const handleCalculate = () => {
    const validPlayers = players.slice(0, numPlayers);
    const courseHandicaps = validPlayers.map(p => {
      const hi = parseFloat(p.handicapIndex);
      const sr = parseFloat(p.slopeRating);
      const cr = parseFloat(p.courseRating);
      const par = parseFloat(p.par);
      if ([hi, sr, cr, par].some(x => isNaN(x))) return null;
      return Math.round(hi * (sr / 113) + (cr - par));
    });

    if (courseHandicaps.some(ch => ch === null)) {
      setResult('Please enter valid numbers for all players.');
      return;
    }

    if (numPlayers < 2 || numPlayers > 4) {
      setResult('Scramble calculation only supports 2-4 players.');
      return;
    }

    // Get the percentages based on number of players
    const getPercentage = (index: number, players: number) => {
      if (players === 2) return index === 0 ? 0.35 : 0.15;
      if (players === 3) return [0.20, 0.15, 0.10][index];
      return [0.20, 0.15, 0.10, 0.05][index];
    };

    // Create detailed calculation info and sort by handicap
    const playerDetails = courseHandicaps
      .map((handicap, idx) => ({
        player: idx + 1,
        courseHandicap: handicap as number
      }))
      .sort((a, b) => a.courseHandicap - b.courseHandicap);

    // Calculate each player's contribution
    const playerContributions = playerDetails.map((player, idx) => ({
      ...player,
      percentage: getPercentage(idx, numPlayers),
      contribution: Math.round(player.courseHandicap * getPercentage(idx, numPlayers) * 100) / 100
    }));

    // Calculate final team handicap
    const scrambleHandicap = Math.round(
      playerContributions.reduce((sum, p) => sum + p.contribution, 0)
    );

    const resultText = [
      'Detailed Calculation:',
      ...playerContributions.map(p => 
        `Player ${p.player}: Course Handicap ${p.courseHandicap} × ${(p.percentage * 100)}% = ${p.contribution}`
      ),
      '',
      `Team Scramble Handicap: ${scrambleHandicap}`
    ].join('\n');

    setResult(resultText);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Back" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 32}}>
        <Text style={styles.title}>Team Scramble</Text>
        <Text style={styles.subtitle}>Number of Players</Text>
        <Picker
          selectedValue={numPlayers}
          style={styles.picker}
          onValueChange={v => setNumPlayers(Number(v))}
        >
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
        </Picker>
        {Array.from({ length: numPlayers }).map((_, idx) => (
          <View key={idx} style={{ width: '100%', alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.subtitle}>{`Player ${idx + 1}`}</Text>
            <CourseTeePicker
              selectedCourse={players[idx].selectedCourse}
              selectedTee={players[idx].selectedTee}
              onCourseChange={v => handlePlayerChange(idx, 'selectedCourse', v)}
              onTeeChange={v => handlePlayerChange(idx, 'selectedTee', v)}
              onTeeAutofill={data => {
                if (data) {
                  handlePlayerChange(idx, 'courseRating', data.courseRating);
                  handlePlayerChange(idx, 'slopeRating', data.slopeRating);
                  handlePlayerChange(idx, 'par', data.par);
                }
              }}
              label={`Player ${idx + 1}`}
            />
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput
                label="Handicap Index"
                keyboardType="decimal-pad"
                value={players[idx].handicapIndex}
                onChangeText={v => handlePlayerChange(idx, 'handicapIndex', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
              <PaperTextInput
                label="Course Rating"
                keyboardType="decimal-pad"
                value={players[idx].courseRating}
                onChangeText={v => handlePlayerChange(idx, 'courseRating', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput
                label="Slope Rating"
                keyboardType="decimal-pad"
                value={players[idx].slopeRating}
                onChangeText={v => handlePlayerChange(idx, 'slopeRating', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
              <PaperTextInput
                label="Par"
                keyboardType="decimal-pad"
                value={players[idx].par}
                onChangeText={v => handlePlayerChange(idx, 'par', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
            </View>
          </View>
        ))}
        <Button mode="contained" onPress={handleCalculate} style={{marginVertical: 8}}>
          Calculate
        </Button>
        {result && (
          <View style={styles.resultContainer}>
            {result.split('\n').map((line, i) => (
              <Text key={i} style={[
                styles.result,
                line.startsWith('Player') ? styles.resultDetail : null,
                line.startsWith('Team') ? styles.teamResult : null
              ]}>
                {line}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  subtitle: { fontSize: 18, marginBottom: 16 },
  pickerLabel: { fontSize: 16, marginRight: 8 },
  picker: { height: 40, width: 200, backgroundColor: '#fff', borderRadius: 6, borderColor: '#ccc', borderWidth: 1, fontSize: 18 },
  inputRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  inputLabel: { fontSize: 16, color: '#333', width: '48%' },  resultContainer: { padding: 16, backgroundColor: '#f8f8f8', borderRadius: 8, width: '90%', marginTop: 8, alignItems: 'center' },
  result: { fontSize: 16, color: '#007b55', marginBottom: 8, textAlign: 'center' },
  resultDetail: { fontSize: 14, color: '#666', marginBottom: 4, textAlign: 'center', width: '100%' },
  teamResult: { fontSize: 18, color: '#007b55', fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
});
