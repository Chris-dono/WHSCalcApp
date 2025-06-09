import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export interface GameTypePickerProps {
  label?: string;
  value: string;
  options: { key: string; label: string }[];
  onChange: (value: string) => void;
}

export function GameTypePicker({ label = 'Game Type', value, options, onChange }: GameTypePickerProps) {
  return (
    <View style={gameTypeStyles.container}>
      <Text style={gameTypeStyles.label}>{label}:</Text>
      <Picker
        selectedValue={value}
        style={gameTypeStyles.picker}
        onValueChange={onChange}
      >
        {options.map(opt => (
          <Picker.Item key={opt.key} label={opt.label} value={opt.key} />
        ))}
      </Picker>
    </View>
  );
}

const gameTypeStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: 250, backgroundColor: '#fff', borderRadius: 6, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 },
  label: { fontSize: 12, marginRight: 8 },
  picker: { height: 50, width: '100%', backgroundColor: '#fff', borderRadius: 6, borderColor: '#ccc', borderWidth: 1, fontSize: 10 },
});