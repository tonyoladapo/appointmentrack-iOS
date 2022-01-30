import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPickedPerson } from '../../actions/appointment';
import uuid from 'react-native-uuid';
import usePeople from '../../hooks/usePeople';
import BottomSheet from '@gorhom/bottom-sheet';

const CreatePerson = ({
  bottomSheetRef,
  fromPicker,
}: {
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
  fromPicker?: boolean;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { goBack } = useNavigation();
  const { addPerson } = usePeople();

  const dispatch = useDispatch();

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
  };

  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    index === -1 && resetInputs();
  }, []);

  useEffect(() => {
    return () => resetInputs();
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.container}>
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={styles.textInput}
          textContentType="name"
        />

        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.textInput}
          textContentType="name"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
          textContentType="emailAddress"
        />

        <TextInput
          placeholder="Phone number"
          value={phone}
          onChangeText={text => setPhone(text)}
          style={styles.textInput}
          textContentType="telephoneNumber"
        />

        <TouchableOpacity
          onPress={() => {
            const id = uuid.v4().toString();

            let newPerson = {
              id,
              firstName,
              lastName,
              email,
              phone,
            };

            addPerson(newPerson);
            bottomSheetRef.current?.close();

            if (fromPicker) {
              dispatch(setPickedPerson(newPerson));
              goBack();
            }
          }}
          style={{
            padding: 16,
            borderRadius: 7,
            backgroundColor: 'tomato',
            alignSelf: 'center',
          }}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 8,
    marginVertical: 2,
  },
});

export default CreatePerson;
