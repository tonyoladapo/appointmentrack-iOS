import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerTypes } from '../../types/main';
import { setPickedPerson } from '../../actions/appointment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as RNLocalize from 'react-native-localize';
import ReminderToggle from '../../components/ReminderToggle';

const CreateAppointment = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());
  const [reminderTime, setReminderTime] = useState<any>(undefined);

  const titleInputRef = useRef<TextInput>(null);

  const { pickedPerson } = useSelector(
    ({ appointment }: ReducerTypes) => appointment,
  );
  const dispatch = useDispatch();

  const deviceLocale = RNLocalize.getLocales()[0].languageTag;
  const resetPersonPicker = () => {
    dispatch(setPickedPerson(null));
  };

  console.log(reminderTime);

  useEffect(() => {
    titleInputRef.current?.focus();
    return () => resetPersonPicker();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        ref={titleInputRef}
        style={styles.textInput}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      {!pickedPerson ? (
        <TouchableOpacity
          style={{ padding: 16 }}
          // onPress={() => modalRef.current?.open()}
        >
          <Text>Choose Person</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text>{pickedPerson.firstName}</Text>

          <TouchableOpacity
            style={{ padding: 16 }}
            // onPress={() => modalRef.current?.open()}
          >
            <Text>Change</Text>
          </TouchableOpacity>
        </View>
      )}

      <DateTimePicker
        mode="datetime"
        value={date}
        minimumDate={new Date()}
        locale={deviceLocale}
        onChange={(_: Event, selectedDate: Date | undefined) =>
          setDate(selectedDate)
        }
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>All day</Text>
        <Switch value={isAllDay} onValueChange={setIsAllDay} />
      </View>

      {!isAllDay && (
        <DateTimePicker
          mode="time"
          value={endTime}
          locale={deviceLocale}
          onChange={(_: Event, selectedTime: Date | undefined) =>
            setEndTime(selectedTime)
          }
        />
      )}

      <TextInput
        placeholder="Notes"
        style={styles.textInput}
        multiline
        numberOfLines={5}
        value={notes}
        placeholderTextColor="#999"
        onChangeText={text => setNotes(text)}
      />

      <ReminderToggle
        appointmentDate={date}
        deviceLocale={deviceLocale}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  textInput: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
  },
});

export default CreateAppointment;
