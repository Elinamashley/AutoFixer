import React, { useState } from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export function TestComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, newDate) => {
    if (event.type === 'set') {
      // 'set' event occurs when the user selects a date
      setSelectedDate(newDate || selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleInputChange}>
        <View>
          <TextInput
          placeholder='ddmmyy'
            value={selectedDate.toDateString()} // Display the selected date in the input field
            editable={false}
          />
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

export default TestComponent;
