import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Divider, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CourseTeePicker from './CourseTeePicker';
import { GameTypePicker } from './GameTypePicker';

const matchplayGameTypeOptions = [
  { key: 'singles', label: 'Singles Matchplay' },
  { key: 'betterball', label: 'Betterball Matchplay' },
  { key: 'foursomes', label: 'Foursomes Matchplay' },
  { key: 'greensomes', label: 'Greensomes Matchplay' },
];

const courseData: { [key: string]: { [key: string]: { courseRating: string; slopeRating: string; par: string } } } = {
  Redlibbets: {
    Black: { courseRating: '72.8', slopeRating: '130', par: '72' },
    White: { courseRating: '70.8', slopeRating: '128', par: '72' },
    Gold: { courseRating: '68.2', slopeRating: '123', par: '72' },
    "Gold W": { courseRating: '73.4', slopeRating: '123', par: '72' },
  }
};

export default function MatchplayScreen({ onBack }: { onBack: () => void }) {
  // Player 1 & 2
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
  // Opponent(s)
  const [oppHandicapIndex, setOppHandicapIndex] = useState('');
  const [oppCourseRating, setOppCourseRating] = useState('');
  const [oppSlopeRating, setOppSlopeRating] = useState('');
  const [oppPar, setOppPar] = useState('');
  const [oppSelectedCourse, setOppSelectedCourse] = useState('');
  const [oppSelectedTee, setOppSelectedTee] = useState('');
  const [oppHandicapIndex1, setOppHandicapIndex1] = useState('');
  const [oppCourseRating1, setOppCourseRating1] = useState('');
  const [oppSlopeRating1, setOppSlopeRating1] = useState('');
  const [oppPar1, setOppPar1] = useState('');
  const [oppSelectedCourse1, setOppSelectedCourse1] = useState('');
  const [oppSelectedTee1, setOppSelectedTee1] = useState('');
  const [oppHandicapIndex2, setOppHandicapIndex2] = useState('');
  const [oppCourseRating2, setOppCourseRating2] = useState('');
  const [oppSlopeRating2, setOppSlopeRating2] = useState('');
  const [oppPar2, setOppPar2] = useState('');
  const [oppSelectedCourse2, setOppSelectedCourse2] = useState('');
  const [oppSelectedTee2, setOppSelectedTee2] = useState('');
  // Game type
  const [gameType, setGameType] = useState('singles');
  const [result, setResult] = useState<string | null>(null);

  // Autofill for Player 1
  React.useEffect(() => {
    if (selectedCourse && selectedTee && courseData[selectedCourse] && courseData[selectedCourse][selectedTee]) {
      setCourseRating(courseData[selectedCourse][selectedTee].courseRating);
      setSlopeRating(courseData[selectedCourse][selectedTee].slopeRating);
      setPar(courseData[selectedCourse][selectedTee].par);
    }
  }, [selectedCourse, selectedTee]);
  // Autofill for Player 2
  React.useEffect(() => {
    if (selectedCourse2 && selectedTee2 && courseData[selectedCourse2] && courseData[selectedCourse2][selectedTee2]) {
      setCourseRating2(courseData[selectedCourse2][selectedTee2].courseRating);
      setSlopeRating2(courseData[selectedCourse2][selectedTee2].slopeRating);
      setPar2(courseData[selectedCourse2][selectedTee2].par);
    }
  }, [selectedCourse2, selectedTee2]);
  // Autofill for Opponent 1
  React.useEffect(() => {
    if (oppSelectedCourse1 && oppSelectedTee1 && courseData[oppSelectedCourse1] && courseData[oppSelectedCourse1][oppSelectedTee1]) {
      setOppCourseRating1(courseData[oppSelectedCourse1][oppSelectedTee1].courseRating);
      setOppSlopeRating1(courseData[oppSelectedCourse1][oppSelectedTee1].slopeRating);
      setOppPar1(courseData[oppSelectedCourse1][oppSelectedTee1].par);
    }
  }, [oppSelectedCourse1, oppSelectedTee1]);
  // Autofill for Opponent 2
  React.useEffect(() => {
    if (oppSelectedCourse2 && oppSelectedTee2 && courseData[oppSelectedCourse2] && courseData[oppSelectedCourse2][oppSelectedTee2]) {
      setOppCourseRating2(courseData[oppSelectedCourse2][oppSelectedTee2].courseRating);
      setOppSlopeRating2(courseData[oppSelectedCourse2][oppSelectedTee2].slopeRating);
      setOppPar2(courseData[oppSelectedCourse2][oppSelectedTee2].par);
    }
  }, [oppSelectedCourse2, oppSelectedTee2]);
  // Autofill for singles opponent
  React.useEffect(() => {
    if (oppSelectedCourse && oppSelectedTee && courseData[oppSelectedCourse] && courseData[oppSelectedCourse][oppSelectedTee]) {
      setOppCourseRating(courseData[oppSelectedCourse][oppSelectedTee].courseRating);
      setOppSlopeRating(courseData[oppSelectedCourse][oppSelectedTee].slopeRating);
      setOppPar(courseData[oppSelectedCourse][oppSelectedTee].par);
    }
  }, [oppSelectedCourse, oppSelectedTee]);

  const handleCalculate = () => {
    if (gameType === 'singles') {
      const hi1 = parseFloat(handicapIndex);
      const sr1 = parseFloat(slopeRating);
      const cr1 = parseFloat(courseRating);
      const p1 = parseFloat(par);
      const ohi = parseFloat(oppHandicapIndex);
      const osr = parseFloat(oppSlopeRating);
      const ocr = parseFloat(oppCourseRating);
      const op = parseFloat(oppPar);
      if ([hi1, sr1, cr1, p1, ohi, osr, ocr, op].some(x => isNaN(x))) {
        setResult('Please enter valid numbers for both players.');
        return;
      }
      const ch1 = Math.round(hi1 * (sr1 / 113) + (cr1 - p1));
      const och1 = Math.round(ohi * (osr / 113) + (ocr - op));
      const diff = Math.abs(ch1 - och1);
      const higher = ch1 > och1 ? 'Player 1' : 'Opponent';
      setResult(`Singles Matchplay\nPlayer 1 Course Handicap: ${ch1}\nOpponent Course Handicap: ${och1}\nFull difference: ${diff} shots given by ${higher}.`);
      return;
    }
    // Team 1 (Player 1 & 2)
    const hi1 = parseFloat(handicapIndex);
    const sr1 = parseFloat(slopeRating);
    const cr1 = parseFloat(courseRating);
    const p1 = parseFloat(par);
    const hi2 = parseFloat(handicapIndex2);
    const sr2 = parseFloat(slopeRating2);
    const cr2 = parseFloat(courseRating2);
    const p2 = parseFloat(par2);
    // Team 2 (Opponents)
    const ohi1 = parseFloat(oppHandicapIndex1);
    const osr1 = parseFloat(oppSlopeRating1);
    const ocr1 = parseFloat(oppCourseRating1);
    const op1 = parseFloat(oppPar1);
    const ohi2 = parseFloat(oppHandicapIndex2);
    const osr2 = parseFloat(oppSlopeRating2);
    const ocr2 = parseFloat(oppCourseRating2);
    const op2 = parseFloat(oppPar2);
    if ([hi1, sr1, cr1, p1, hi2, sr2, cr2, p2, ohi1, osr1, ocr1, op1, ohi2, osr2, ocr2, op2].some(x => isNaN(x))) {
      setResult('Please enter valid numbers for all players.');
      return;
    }
    // Calculate course handicaps
    const ch1 = Math.round(hi1 * (sr1 / 113) + (cr1 - p1));
    const ch2 = Math.round(hi2 * (sr2 / 113) + (cr2 - p2));
    const och1 = Math.round(ohi1 * (osr1 / 113) + (ocr1 - op1));
    const och2 = Math.round(ohi2 * (osr2 / 113) + (ocr2 - op2));
    let resultText = '';
    switch (gameType) {
      case 'betterball': {
        const ph = [Math.round(ch1 * 0.9), Math.round(ch2 * 0.9), Math.round(och1 * 0.9), Math.round(och2 * 0.9)];
        const min = Math.min(...ph);
        const shots = ph.map(h => h - min);
        resultText = `Betterball Matchplay\n\nTeam 1:\nPlayer 1: ${ph[0]}\nPlayer 2: ${ph[1]}\nTeam 2:\nOpponent 1: ${ph[2]}\nOpponent 2: ${ph[3]}\n\nShots given/received (from lowest):\nTeam 1: ${shots[0]}, ${shots[1]}\nTeam 2: ${shots[2]}, ${shots[3]}`;
        break;
      }
      case 'foursomes':
      case 'st_andrews': {
        const team1 = Math.round((ch1 + ch2) * 0.5);
        const team2 = Math.round((och1 + och2) * 0.5);
        const min = Math.min(team1, team2);
        const shots = [team1 - min, team2 - min];
        resultText = `${gameType === 'foursomes' ? 'Foursomes' : 'St Andrews Foursomes'} Matchplay\n\nTeam 1: ${team1}\nTeam 2: ${team2}\n\nShots given/received (from lowest):\nTeam 1: ${shots[0]}\nTeam 2: ${shots[1]}`;
        break;
      }
      case 'greensomes': {
        const t1low = Math.min(ch1, ch2);
        const t1high = Math.max(ch1, ch2);
        const t2low = Math.min(och1, och2);
        const t2high = Math.max(och1, och2);
        const team1 = Math.round(t1low * 0.6 + t1high * 0.4);
        const team2 = Math.round(t2low * 0.6 + t2high * 0.4);
        const min = Math.min(team1, team2);
        const shots = [team1 - min, team2 - min];
        resultText = `Greensomes Matchplay\n\nTeam 1: ${team1}\nTeam 2: ${team2}\n\nShots given/received (from lowest):\nTeam 1: ${shots[0]}\nTeam 2: ${shots[1]}`;
        break;
      }
      default:
        resultText = 'Select a valid matchplay game type.';
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
        <Text style={styles.title}>Matchplay</Text>
        <View style={{ width: '100%', alignItems: 'stretch', marginBottom: 8 }}>
          <GameTypePicker
            value={gameType}
            options={matchplayGameTypeOptions}
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
        <Card style={{marginBottom: 8, width: '95%'}}>
          <Card.Content>
            <Title>Player 1</Title>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput label="Handicap Index" keyboardType="decimal-pad" value={handicapIndex} onChangeText={setHandicapIndex} style={{ flex: 1 }} returnKeyType="done" />
              <PaperTextInput label="Course Rating" keyboardType="decimal-pad" value={courseRating} onChangeText={setCourseRating} style={{ flex: 1 }} returnKeyType="done" />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <PaperTextInput label="Slope Rating" keyboardType="decimal-pad" value={slopeRating} onChangeText={setSlopeRating} style={{ flex: 1 }} returnKeyType="done" />
              <PaperTextInput label="Par" keyboardType="decimal-pad" value={par} onChangeText={setPar} style={{ flex: 1 }} returnKeyType="done" />
            </View>
          </Card.Content>
        </Card>
        {gameType !== 'singles' && (
          <>
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
                  <PaperTextInput label="Handicap Index (Player 2)" keyboardType="decimal-pad" value={handicapIndex2} onChangeText={setHandicapIndex2} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Course Rating (Player 2)" keyboardType="decimal-pad" value={courseRating2} onChangeText={setCourseRating2} style={{ flex: 1 }} returnKeyType="done" />
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Slope Rating (Player 2)" keyboardType="decimal-pad" value={slopeRating2} onChangeText={setSlopeRating2} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Par (Player 2)" keyboardType="decimal-pad" value={par2} onChangeText={setPar2} style={{ flex: 1 }} returnKeyType="done" />
                </View>
              </Card.Content>
            </Card>
          </>
        )}
        <Divider style={{marginVertical: 8, width: '95%', alignSelf: 'center'}} />
        {gameType === 'singles' ? (
          <>
            <CourseTeePicker
              selectedCourse={oppSelectedCourse}
              selectedTee={oppSelectedTee}
              onCourseChange={setOppSelectedCourse}
              onTeeChange={setOppSelectedTee}
              onTeeAutofill={data => {
                if (data) {
                  setOppCourseRating(data.courseRating);
                  setOppSlopeRating(data.slopeRating);
                  setOppPar(data.par);
                } else {
                  setOppCourseRating('');
                  setOppSlopeRating('');
                  setOppPar('');
                }
              }}
            />
            <Card style={{marginBottom: 8, width: '95%'}}>
              <Card.Content>
                <Title>Opponent</Title>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Handicap Index (Opponent)" keyboardType="decimal-pad" value={oppHandicapIndex} onChangeText={setOppHandicapIndex} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Course Rating (Opponent)" keyboardType="decimal-pad" value={oppCourseRating} onChangeText={setOppCourseRating} style={{ flex: 1 }} returnKeyType="done" />
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Slope Rating (Opponent)" keyboardType="decimal-pad" value={oppSlopeRating} onChangeText={setOppSlopeRating} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Par (Opponent)" keyboardType="decimal-pad" value={oppPar} onChangeText={setOppPar} style={{ flex: 1 }} returnKeyType="done" />
                </View>
              </Card.Content>
            </Card>
          </>
        ) : (
          <>
            <CourseTeePicker
              selectedCourse={oppSelectedCourse1}
              selectedTee={oppSelectedTee1}
              onCourseChange={setOppSelectedCourse1}
              onTeeChange={setOppSelectedTee1}
              onTeeAutofill={data => {
                if (data) {
                  setOppCourseRating1(data.courseRating);
                  setOppSlopeRating1(data.slopeRating);
                  setOppPar1(data.par);
                } else {
                  setOppCourseRating1('');
                  setOppSlopeRating1('');
                  setOppPar1('');
                }
              }}
            />
            <Card style={{marginBottom: 8, width: '95%'}}>
              <Card.Content>
                <Title>Opponent 1</Title>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Handicap Index (Opponent 1)" keyboardType="decimal-pad" value={oppHandicapIndex1} onChangeText={setOppHandicapIndex1} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Course Rating (Opponent 1)" keyboardType="decimal-pad" value={oppCourseRating1} onChangeText={setOppCourseRating1} style={{ flex: 1 }} returnKeyType="done" />
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Slope Rating (Opponent 1)" keyboardType="decimal-pad" value={oppSlopeRating1} onChangeText={setOppSlopeRating1} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Par (Opponent 1)" keyboardType="decimal-pad" value={oppPar1} onChangeText={setOppPar1} style={{ flex: 1 }} returnKeyType="done" />
                </View>
              </Card.Content>
            </Card>
            <CourseTeePicker
              selectedCourse={oppSelectedCourse2}
              selectedTee={oppSelectedTee2}
              onCourseChange={setOppSelectedCourse2}
              onTeeChange={setOppSelectedTee2}
              onTeeAutofill={data => {
                if (data) {
                  setOppCourseRating2(data.courseRating);
                  setOppSlopeRating2(data.slopeRating);
                  setOppPar2(data.par);
                } else {
                  setOppCourseRating2('');
                  setOppSlopeRating2('');
                  setOppPar2('');
                }
              }}
            />
            <Card style={{marginBottom: 8, width: '95%'}}>
              <Card.Content>
                <Title>Opponent 2</Title>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Handicap Index (Opponent 2)" keyboardType="decimal-pad" value={oppHandicapIndex2} onChangeText={setOppHandicapIndex2} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Course Rating (Opponent 2)" keyboardType="decimal-pad" value={oppCourseRating2} onChangeText={setOppCourseRating2} style={{ flex: 1 }} returnKeyType="done" />
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                  <PaperTextInput label="Slope Rating (Opponent 2)" keyboardType="decimal-pad" value={oppSlopeRating2} onChangeText={setOppSlopeRating2} style={{ flex: 1 }} returnKeyType="done" />
                  <PaperTextInput label="Par (Opponent 2)" keyboardType="decimal-pad" value={oppPar2} onChangeText={setOppPar2} style={{ flex: 1 }} returnKeyType="done" />
                </View>
              </Card.Content>
            </Card>
          </>
        )}
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
  pickerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: '100%', backgroundColor: '#fff', borderRadius: 4, borderColor: '#ccc', borderWidth: 0, paddingHorizontal: 10 },
  pickerLabel: { fontSize: 12, marginRight: 8 },
  picker: { height:100, width: '100%', backgroundColor: '#fff', borderRadius: 4, borderColor: '#ccc', borderWidth: 0, fontSize: 16 },
  result: { fontSize: 18, color: '#007b55', marginVertical: 10, fontWeight: 'bold' },
});
