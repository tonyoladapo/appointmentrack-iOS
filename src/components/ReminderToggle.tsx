import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface Props {
  deviceLocale: string;
  reminderTime: Date;
  setReminderTime: (date: Date | undefined) => void;
  appointmentDate: Date;
}

const ReminderToggle = ({
  setReminderTime,
  reminderTime,
  appointmentDate,
}: Props) => {
  const [isReminderOn, setIsReminderOn] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState<
    '30mins' | '1hr' | '1day' | 'custom' | undefined
  >(undefined);

  const test = () => {
    switch (checkboxValue) {
      case '30mins':
        setReminderTime(
          moment(appointmentDate).subtract('30', 'minutes').toDate(),
        );
        break;

      case '1hr':
        setReminderTime(
          moment(appointmentDate).subtract('1', 'hours').toDate(),
        );
        break;

      case '1day':
        setReminderTime(moment(appointmentDate).subtract('1', 'days').toDate());
        break;

      case 'custom':
        setReminderTime(
          moment(appointmentDate).subtract('30', 'minutes').toDate(),
        );
        break;

      default:
        setReminderTime(undefined);
    }
  };

  useEffect(() => {
    test();
  }, [checkboxValue, appointmentDate]);

  return (
    <View style={styles.container}>
      <Text>Remind me</Text>
      <Switch
        value={isReminderOn}
        onValueChange={state => {
          setIsReminderOn(state);
          !state ? setCheckboxValue(undefined) : setCheckboxValue('30mins');
        }}
      />

      {isReminderOn && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <CheckBox
              value={checkboxValue === '30mins'}
              onValueChange={() => setCheckboxValue('30mins')}
            />

            <Text>30 minutes before</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <CheckBox
              value={checkboxValue === '1hr'}
              onValueChange={() => setCheckboxValue('1hr')}
            />

            <Text>1 hour before</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <CheckBox
              value={checkboxValue === '1day'}
              onValueChange={() => setCheckboxValue('1day')}
            />

            <Text>A day before</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <CheckBox
              value={checkboxValue === 'custom'}
              onValueChange={() => setCheckboxValue('custom')}
            />

            <Text>Custom</Text>
          </View>

          {checkboxValue === 'custom' && (
            <DateTimePicker
              mode="datetime"
              value={reminderTime}
              minimumDate={new Date()}
              onChange={(_: Event, date: Date | undefined) =>
                setReminderTime(date)
              }
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReminderToggle;
