import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPickedPerson } from '../../actions/appointment';
import usePeople from '../../hooks/usePeople';
import DismissKeyboardView from '../../components/DismissKeyboardView';

const CreatePerson = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const { addPerson } = usePeople();

  const { goBack } = useNavigation();

  const onSubmit = async () => {
    const newPerson = {
      firstName,
      lastName,
      email,
      phone,
    };

    const id: any = await addPerson(newPerson);
    dispatch(setPickedPerson({ ...newPerson, id }));

    goBack();
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Text>Go back</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Firstname"
          value={firstName}
          onChangeText={setFirstname}
        />
        <TextInput
          style={styles.input}
          placeholder="Lastname"
          value={lastName}
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity
          onPress={onSubmit}
          style={{
            padding: 16,
            backgroundColor: 'tomato',
            borderRadius: 7,
            alignSelf: 'center',
            width: '60%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    borderWidth: 1,
    padding: 16,
    marginVertical: 4,
  },
});

export default CreatePerson;
