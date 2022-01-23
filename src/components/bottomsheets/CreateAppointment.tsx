import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerTypes } from '../../types/main';
import { setPickedPerson } from '../../actions/appointment';
import uuid from 'react-native-uuid';
import BottomSheet from '@gorhom/bottom-sheet';
import * as RNLocalize from 'react-native-localize';
import useAppointments from '../../hooks/useAppointments';

const CreateAppointment = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
}) => {
  const { navigate } = useNavigation<RootNavigationProp>();

  const { addAppointment } = useAppointments();

  const { pickedPerson } = useSelector(
    ({ appointment }: ReducerTypes) => appointment,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => resetInputs();
  }, []);

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState<any>(new Date());
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());

  const deviceLocale = RNLocalize.getLocales()[0].languageTag;

  const resetInputs = () => {
    setTitle('');
    setNotes('');
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setIsAllDay(false);
    dispatch(setPickedPerson(null));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.textInput}
        value={title}
        onChangeText={text => setTitle(text)}
      />

      {!pickedPerson ? (
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => navigate('PersonPicker')}>
          <Text>Choose Person</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text>{pickedPerson.firstName}</Text>

          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => navigate('PersonPicker')}>
            <Text>Change</Text>
          </TouchableOpacity>
        </View>
      )}

      <DateTimePicker
        mode="date"
        value={date}
        minimumDate={new Date()}
        locale={deviceLocale}
        onChange={(e: Event, selectedDate: Date | undefined) =>
          setDate(selectedDate)
        }
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>All day</Text>
        <Switch value={isAllDay} onValueChange={() => setIsAllDay(!isAllDay)} />
      </View>

      <DateTimePicker
        mode="time"
        value={startTime}
        locale={deviceLocale}
        onChange={(e: Event, selectedTime: Date | undefined) =>
          setStartTime(selectedTime)
        }
      />

      {!isAllDay && (
        <DateTimePicker
          mode="time"
          value={endTime}
          locale={deviceLocale}
          onChange={(e: Event, selectedTime: Date | undefined) =>
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
        onChangeText={text => setNotes(text)}
      />

      <TouchableOpacity
        onPress={() => {
          const id = uuid.v4().toString();

          let newAppointment = {
            id,
            title,
            notes,
            date,
            startTime,
            endTime,
            isAllDay,
            person: pickedPerson,
          };

          addAppointment(newAppointment);
          bottomSheetRef.current?.close();
        }}
        style={{
          padding: 16,
          borderRadius: 7,
          backgroundColor: 'tomato',
          alignSelf: 'center',
        }}>
        <Text style={{ color: 'white' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 8,
  },
});

export default CreateAppointment;
