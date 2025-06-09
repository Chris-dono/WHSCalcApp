import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CourseTeePicker from './CourseTeePicker';

const courseData = {
  old: {
    white: { courseRating: '73.1', slopeRating: '135', par: '72' },
    yellow: { courseRating: '71.0', slopeRating: '130', par: '72' },
  },
  new: {
    white: { courseRating: '72.7', slopeRating: '132', par: '71' },
    yellow: { courseRating: '70.8', slopeRating: '128', par: '71' },
  },
  jubilee: {
    white: { courseRating: '72.0', slopeRating: '129', par: '72' },
    yellow: { courseRating: '70.2', slopeRating: '125', par: '72' },
  },
};

export default function ScrambleScreen({ onBack }: { onBack: () => void }) {
  const [numPlayers, setNumPlayers] = useState(4);
  const [players, setPlayers] = useState([
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
    { handicapIndex: '', courseRating: '', slopeRating: '', par: '', selectedCourse: '', selectedTee: '' },
  ]);
  const [result, setResult] = useState<string | null>(null);

  React.useEffect(() => {
    setPlayers(prev => prev.map((p, i) => {
      if (p.selectedCourse && p.selectedTee && courseData[p.selectedCourse] && courseData[p.selectedCourse][p.selectedTee]) {
        return {
          ...p,
          courseRating: courseData[p.selectedCourse][p.selectedTee].courseRating,
          slopeRating: courseData[p.selectedCourse][p.selectedTee].slopeRating,
          par: courseData[p.selectedCourse][p.selectedTee].par,
        };
      }
      return p;
    }));
    // eslint-disable-next-line
  }, [players.map(p => p.selectedCourse + p.selectedTee).join(',')]);

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
    const sorted = [...courseHandicaps as number[]].sort((a, b) => a - b);
    let scrambleHandicap = 0;
    if (numPlayers === 2) {
      scrambleHandicap = Math.round(sorted[0] * 0.35 + sorted[1] * 0.15);
    } else if (numPlayers === 3) {
      scrambleHandicap = Math.round(sorted[0] * 0.20 + sorted[1] * 0.15 + sorted[2] * 0.10);
    } else if (numPlayers === 4) {
      scrambleHandicap = Math.round(sorted[0] * 0.20 + sorted[1] * 0.15 + sorted[2] * 0.10 + sorted[3] * 0.05);
    } else {
      setResult('Scramble calculation only supports 2-4 players.');
      return;
    }
    setResult(`Team Scramble Handicap: ${scrambleHandicap}`);
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
            />
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput
                label="Handicap Index"
                keyboardType="numeric"
                value={players[idx].handicapIndex}
                onChangeText={v => handlePlayerChange(idx, 'handicapIndex', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
              <PaperTextInput
                label="Course Rating"
                keyboardType="numeric"
                value={players[idx].courseRating}
                onChangeText={v => handlePlayerChange(idx, 'courseRating', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput
                label="Slope Rating"
                keyboardType="numeric"
                value={players[idx].slopeRating}
                onChangeText={v => handlePlayerChange(idx, 'slopeRating', v)}
                style={{ flex: 1 }}
                returnKeyType="done"
              />
              <PaperTextInput
                label="Par"
                keyboardType="numeric"
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
        {result && <Text style={styles.result}>{result}</Text>}
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
  inputLabel: { fontSize: 16, color: '#333', width: '48%' },
  result: { fontSize: 18, color: '#007b55', marginVertical: 12, fontWeight: 'bold' },
});
