import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface Props {
  deviceLocale: string;
  reminderTime: Date;
  setReminderTime: (date: Date | undefined) => void;
  appointmentDate: Date;
}

const ReminderToggle = ({
  deviceLocale,
  setReminderTime,
  reminderTime,
  appointmentDate,
}: Props) => {
  const [remindMe, setRemindMe] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<any>(null);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [selected, setSelected] = useState<30 | 60 | 1440 | -1>(30);
  const [dropdownItems, setDropdownItems] = useState([
    { label: '30 Mins before', value: 30 },
    { label: '1 hr before', value: 60 },
    { label: 'A day before', value: 1440 },
    { label: 'Custom', value: -1 },
  ]);

  useEffect(() => {
    remindMe && handleTimePicked(selected);
  }, [appointmentDate]);

  const handleTimePicked = (time: number) => {
    switch (time) {
      case 30:
        setSelected(30);
        setReminderTime(
          moment(appointmentDate).subtract(30, 'minutes').toDate(),
        );
        break;
      case 60:
        setSelected(60);
        setReminderTime(
          moment(appointmentDate).subtract(60, 'minutes').toDate(),
        );
        break;
      case 1440:
        setSelected(1440);
        setReminderTime(moment(appointmentDate).subtract(1, 'day').toDate());
        break;
      default:
        setSelected(-1);
        setIsCustomTime(true);
    }
  };

  return (
    <>
      <View>
        <Text>Remind me</Text>
        <Switch
          value={remindMe}
          onValueChange={value => {
            setRemindMe(_ => {
              if (value == false) setReminderTime(undefined);
              else handleTimePicked(30);
              return value;
            });
          }}
        />
      </View>

      {remindMe && (
        <>
          <DropDownPicker
            value={dropdownValue}
            setValue={setDropdownValue}
            open={isDropdownOpen}
            setOpen={setIsDropdownOpen}
            items={dropdownItems}
            setItems={setDropdownItems}
            placeholder="Pick reminder time"
            onChangeValue={(value: any) => handleTimePicked(value)}
          />

          {isCustomTime && (
            <DateTimePicker
              mode="datetime"
              value={reminderTime}
              locale={deviceLocale}
              minimumDate={new Date()}
              onChange={(_: Event, selectedTime: Date | undefined) =>
                setReminderTime(selectedTime)
              }
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default ReminderToggle;
