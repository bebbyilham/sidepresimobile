import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput as TextInputRN,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  disable,
  ...restProps
}) => {
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date(Date.now()));

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
        {/* <View style={styles.container(color)}>
          <Text style={styles.text(textColor)}>{text}</Text>
        </View> */}
        <Text style={styles.input} onChange={onDateSelected}>
          {date.toUTCString()}
        </Text>
      </TouchableOpacity>

      {datePicker && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={date}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelected}
        />
      )}
    </View>
  );
};
export default DatePicker;

const styles = StyleSheet.create({
  label: {fontSize: 16, fontFamily: 'Poppins-Medium', color: '#020202'},
  input: {borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 10},
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
