import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native';
import { Appbar, Card, Title, Divider, Button, TextInput as PaperTextInput } from 'react-native-paper';
import CourseTeePicker from './CourseTeePicker';

export default function StrokeplayScreen({ onBack }: { onBack: () => void }) {
  const [handicapIndex, setHandicapIndex] = useState('');
  const [courseRating, setCourseRating] = useState('');
  const [slopeRating, setSlopeRating] = useState('');
  const [par, setPar] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTee, setSelectedTee] = useState('');

  const handleCalculate = () => {
    const hi = parseFloat(handicapIndex);
    const sr = parseFloat(slopeRating);
    const cr = parseFloat(courseRating);
    const p = parseFloat(par);
    if (isNaN(hi) || isNaN(sr) || isNaN(cr) || isNaN(p)) {
      setResult('Please enter valid numbers.');
      return;
    }
    const courseHandicapRaw = hi * (sr / 113) + (cr - p);
    const courseHandicap = Math.round(courseHandicapRaw);
    const playingHandicap = Math.round(courseHandicap * 0.95);
    setResult(`Course Handicap: ${courseHandicap}\nPlaying Handicap (95%): ${playingHandicap}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Back" />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Individual Strokeplay</Text>
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
            <Title>Player</Title>
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
        <Divider style={{ marginVertical: 8, width: '95%', alignSelf: 'center' }} />
        <Button mode="contained" onPress={handleCalculate} style={{ marginVertical: 8 }} accessibilityLabel="Calculate Button" testID="calculate-button">
          Calculate
        </Button>
        {result && <Text style={styles.result}>{result}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  result: { fontSize: 18, color: '#007b55', marginVertical: 12, fontWeight: 'bold' },
});
