import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalStackParamList } from '../types/navigation';
import CreateAppointment from '../screens/modalStack/CreateAppointment';
import PersonPicker from '../screens/modalStack/PersonPicker';
import CreatePerson from '../screens/modalStack/CreatePerson';

const Stack = createNativeStackNavigator<ModalStackParamList>();

const ModalStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CreateAppointment"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateAppointment" component={CreateAppointment} />
      <Stack.Screen name="PersonPicker" component={PersonPicker} />
      <Stack.Screen name="CreatePerson" component={CreatePerson} />
    </Stack.Navigator>
  );
};

export default ModalStack;
