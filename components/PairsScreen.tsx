import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Divider, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { GameTypePicker } from './GameTypePicker';
import CourseTeePicker from './CourseTeePicker';

const gameTypeOptions = [
  { key: 'betterball', label: 'Betterball Stableford' },
  { key: 'combined', label: 'Combined Stableford' },
  { key: 'greensomes', label: 'Greensomes' },
  { key: 'foursomes', label: 'Foursomes' },
  { key: 'st_andrews', label: 'St Andrews Foursomes' },
];

export default function PairsScreen({ onBack }: { onBack: () => void }) {
  const [handicapIndex, setHandicapIndex] = useState('');
  const [courseRating, setCourseRating] = useState('');
  const [slopeRating, setSlopeRating] = useState('');
  const [par, setPar] = useState('');
  const [handicapIndex2, setHandicapIndex2] = useState('');
  const [courseRating2, setCourseRating2] = useState('');
  const [slopeRating2, setSlopeRating2] = useState('');
  const [par2, setPar2] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTee, setSelectedTee] = useState('');
  const [selectedCourse2, setSelectedCourse2] = useState('');
  const [selectedTee2, setSelectedTee2] = useState('');
  const [gameType, setGameType] = useState('betterball');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const hi1 = parseFloat(handicapIndex);
    const sr1 = parseFloat(slopeRating);
    const cr1 = parseFloat(courseRating);
    const p1 = parseFloat(par);
    const hi2 = parseFloat(handicapIndex2);
    const sr2 = parseFloat(slopeRating2);
    const cr2 = parseFloat(courseRating2);
    const p2 = parseFloat(par2);
    if ([hi1, sr1, cr1, p1, hi2, sr2, cr2, p2].some(x => isNaN(x))) {
      setResult('Please enter valid numbers for both players.');
      return;
    }
    const courseHandicap1 = Math.round(hi1 * (sr1 / 113) + (cr1 - p1));
    const courseHandicap2 = Math.round(hi2 * (sr2 / 113) + (cr2 - p2));
    let playingHandicap1 = courseHandicap1;
    let playingHandicap2 = courseHandicap2;
    let resultText = '';
    switch (gameType) {
      case 'betterball':
        playingHandicap1 = Math.round(courseHandicap1 * 0.9);
        playingHandicap2 = Math.round(courseHandicap2 * 0.9);
        resultText = `Betterball Stableford\nPlayer 1\nCourse Handicap: ${courseHandicap1}\nPlaying Handicap (90%): ${playingHandicap1}` +
          `\n\nPlayer 2\nCourse Handicap: ${courseHandicap2}\nPlaying Handicap (90%): ${playingHandicap2}`;
        break;
      case 'combined':
        playingHandicap1 = Math.round(courseHandicap1 * 0.85);
        playingHandicap2 = Math.round(courseHandicap2 * 0.85);
        resultText = `Combined Stableford\nPlayer 1\nCourse Handicap: ${courseHandicap1}\nPlaying Handicap (85%): ${playingHandicap1}` +
          `\n\nPlayer 2\nCourse Handicap: ${courseHandicap2}\nPlaying Handicap (85%): ${playingHandicap2}`;
        break;
      case 'greensomes':
        const lower = Math.min(courseHandicap1, courseHandicap2);
        const higher = Math.max(courseHandicap1, courseHandicap2);
        const greensomesHandicap = Math.round(lower * 0.6 + higher * 0.4);
        resultText = `Greensomes\nLower Course Handicap: ${lower}\nHigher Course Handicap: ${higher}` +
          `\nGreensomes Playing Handicap (60/40): ${greensomesHandicap}`;
        break;
      case 'foursomes':
        const foursomesHandicap = Math.round((courseHandicap1 + courseHandicap2) * 0.5);
        resultText = `Foursomes\nPlayer 1 Course Handicap: ${courseHandicap1}\nPlayer 2 Course Handicap: ${courseHandicap2}` +
          `\nFoursomes Playing Handicap (50% combined): ${foursomesHandicap}`;
        break;
      case 'st_andrews':
        const stAndrewsHandicap = Math.round((courseHandicap1 + courseHandicap2) * 0.5);
        resultText = `St Andrews Foursomes\nPlayer 1 Course Handicap: ${courseHandicap1}\nPlayer 2 Course Handicap: ${courseHandicap2}` +
          `\nSt Andrews Foursomes Playing Handicap (50% combined): ${stAndrewsHandicap}`;
        break;
      default:
        playingHandicap1 = Math.round(courseHandicap1);
        playingHandicap2 = Math.round(courseHandicap2);
        resultText = `Player 1\nCourse Handicap: ${courseHandicap1}\nPlaying Handicap: ${playingHandicap1}` +
          `\n\nPlayer 2\nCourse Handicap: ${courseHandicap2}\nPlaying Handicap: ${playingHandicap2}`;
    }
    setResult(resultText);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Back" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 32}}>
        <Text style={styles.title}>Pairs Event</Text>
        <View style={{ width: '100%', alignItems: 'stretch', marginBottom: 8 }}>
          <GameTypePicker
            value={gameType}
            options={gameTypeOptions}
            onChange={setGameType}
          />
        </View>
        <CourseTeePicker
          selectedCourse={selectedCourse}
          selectedTee={selectedTee}
          onCourseChange={setSelectedCourse}
          onTeeChange={setSelectedTee}
          onTeeAutofill={data => {
            if (data) {
              setCourseRating(data.courseRating);
              setSlopeRating(data.slopeRating);
              setPar(data.par);
            } else {
              setCourseRating('');
              setSlopeRating('');
              setPar('');
            }
          }}
        />
        <Card style={{ marginBottom: 8, width: '95%' }}>
          <Card.Content>
            <Title>Player 1</Title>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput label="Handicap Index" keyboardType="numeric" value={handicapIndex} onChangeText={setHandicapIndex} style={{ flex: 1 }} returnKeyType="done" />
              <PaperTextInput label="Course Rating" keyboardType="numeric" value={courseRating} onChangeText={setCourseRating} style={{ flex: 1 }} returnKeyType="done" />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput label="Slope Rating" keyboardType="numeric" value={slopeRating} onChangeText={setSlopeRating} style={{ flex: 1 }} returnKeyType="done" />
              <PaperTextInput label="Par" keyboardType="numeric" value={par} onChangeText={setPar} style={{ flex: 1 }} returnKeyType="done" />
            </View>
          </Card.Content>
        </Card>
        <CourseTeePicker
          selectedCourse={selectedCourse2}
          selectedTee={selectedTee2}
          onCourseChange={setSelectedCourse2}
          onTeeChange={setSelectedTee2}
          onTeeAutofill={data => {
            if (data) {
              setCourseRating2(data.courseRating);
              setSlopeRating2(data.slopeRating);
              setPar2(data.par);
            } else {
              setCourseRating2('');
              setSlopeRating2('');
              setPar2('');
            }
          }}
        />
        <Card style={{marginBottom: 8, width: '95%'}}>
          <Card.Content>
            <Title>Player 2</Title>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput label="Handicap Index (Player 2)" keyboardType="numeric" value={handicapIndex2} onChangeText={setHandicapIndex2} style={{ flex: 1 }} returnKeyType="done" />
              <PaperTextInput label="Course Rating (Player 2)" keyboardType="numeric" value={courseRating2} onChangeText={setCourseRating2} style={{ flex: 1 }} returnKeyType="done" />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput label="Slope Rating (Player 2)" keyboardType="numeric" value={slopeRating2} onChangeText={setSlopeRating2} style={{ flex: 1 }} returnKeyType="done" />
              <PaperTextInput label="Par (Player 2)" keyboardType="numeric" value={par2} onChangeText={setPar2} style={{ flex: 1 }} returnKeyType="done" />
            </View>
          </Card.Content>
        </Card>
        <Divider style={{marginVertical: 8, width: '95%', alignSelf: 'center'}} />
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
  pickerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: 250, backgroundColor: '#fff', borderRadius: 6, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 },
  pickerLabel: { fontSize: 16, marginRight: 8 },
  picker: { height: 50, width: 200, backgroundColor: '#fff', borderRadius: 6, borderColor: '#ccc', borderWidth: 1, fontSize: 16 },
  result: { fontSize: 18, color: '#007b55', marginVertical: 12, fontWeight: 'bold' },
});
