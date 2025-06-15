import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const COURSE_DATA: { [course: string]: { [tee: string]: { courseRating: string; slopeRating: string; par: string } } } = {
  redlibbets: {
    black: { courseRating: '72.8', slopeRating: '130', par: '72' },
    white: { courseRating: '70.8', slopeRating: '128', par: '72' },
    'gold-men': { courseRating: '68.2', slopeRating: '123', par: '72' },
    'gold-ladies': { courseRating: '73.4', slopeRating: '123', par: '72' },
  },
};

interface CourseTeePickerProps {
  selectedCourse: string;
  selectedTee: string;
  onCourseChange: (course: string) => void;
  onTeeChange: (tee: string) => void;
  onTeeAutofill?: (data: { courseRating: string; slopeRating: string; par: string } | null) => void;
  label?: string;
}

export default function CourseTeePicker({
  selectedCourse,
  selectedTee,
  onCourseChange,
  onTeeChange,
  onTeeAutofill,
  label = 'Player',
}: CourseTeePickerProps) {
  // Autofill effect
  React.useEffect(() => {
    if (onTeeAutofill && selectedCourse && selectedTee && COURSE_DATA[selectedCourse] && COURSE_DATA[selectedCourse][selectedTee]) {
      onTeeAutofill(COURSE_DATA[selectedCourse][selectedTee]);
    } else if (onTeeAutofill) {
      onTeeAutofill(null);
    }
  }, [selectedCourse, selectedTee]);

  return (
    <View style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, width: '100%' }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          {/* <Text style={styles.pickerLabel}>Course:</Text> */}
          <Picker
            selectedValue={selectedCourse}
            style={styles.picker}
            onValueChange={onCourseChange}
          >
            <Picker.Item label="Course" value="" />
            <Picker.Item label="Redlibbets" value="redlibbets" />
          </Picker>
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          {/* <Text style={styles.pickerLabel}>Tee:</Text> */}
          <Picker
            selectedValue={selectedTee}
            style={styles.picker}
            onValueChange={onTeeChange}
          >
            <Picker.Item label="Tee" value="" />
            <Picker.Item label="Black" value="black"/>
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Gold - Men" value="gold-men" />
            <Picker.Item label="Gold - Ladies" value="gold-ladies" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerLabel: { fontSize: 15, marginRight: 8 },
  picker: { height: 50, width: 160, backgroundColor: '#fff', borderRadius: 6, borderColor: '#ccc', borderWidth: 1, fontSize: 12 },
});
