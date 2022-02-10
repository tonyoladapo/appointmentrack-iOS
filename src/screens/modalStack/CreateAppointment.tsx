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
import { useNavigation } from '@react-navigation/native';
import { ModalNavigationProp } from '../../types/navigation';
import { toggleCreateAppointmentModal } from '../../actions/modal';
import useAppointments from '../../hooks/useAppointments';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReminderToggle from '../../components/ReminderToggle';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';

const CreateAppointment = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());
  const [reminderTime, setReminderTime] = useState<any>(null);

  const { navigate } = useNavigation<ModalNavigationProp>();
  const { addAppointment } = useAppointments();

  const titleInputRef = useRef<TextInput>(null);

  const { pickedPerson } = useSelector(
    ({ appointment }: ReducerTypes) => appointment,
  );
  const dispatch = useDispatch();

  const deviceLocale = RNLocalize.getLocales()[0].languageTag;
  const resetPersonPicker = () => {
    dispatch(setPickedPerson(null));
  };

  useEffect(() => {
    //TODO: ask permission to sync with calendar
    calendarPermission();
    titleInputRef.current?.focus();
    return () => resetPersonPicker();
  }, []);

  useEffect(() => {
    setEndTime(moment(date).add(1, 'hour').toDate());
  }, [date]);

  const calendarPermission = async () => {
    try {
      const permissionStatus = await RNCalendarEvents.checkPermissions();

      if (permissionStatus !== 'authorized') {
        await RNCalendarEvents.requestPermissions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isValidForm = () => {
    return title.length > 0 && pickedPerson !== null;
  };

  const onSubmit = async () => {
    const appointment = {
      title,
      notes,
      allDay: isAllDay,
      date,
      endTime,
      reminderTime,
      person: pickedPerson,
    };

    if (!isValidForm()) return; //TODO: show error message
    addAppointment(appointment);

    dispatch(toggleCreateAppointmentModal(false));
  };

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

      {pickedPerson && <Text>{pickedPerson.firstName}</Text>}

      <TouchableOpacity
        style={{ padding: 16 }}
        onPress={() => navigate('PersonPicker')}>
        <Text>{!pickedPerson ? 'Choose person' : 'Change'}</Text>
      </TouchableOpacity>

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

      <TouchableOpacity onPress={onSubmit} style={{ padding: 16 }}>
        <Text>Save</Text>
      </TouchableOpacity>
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
