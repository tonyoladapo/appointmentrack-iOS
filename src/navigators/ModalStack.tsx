import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAppointment from '../screens/modalStack/CreateAppointment';

const Stack = createNativeStackNavigator();

const ModalStack = () => {
  return (
    <Stack.Navigator initialRouteName="CreateAppointment">
      <Stack.Screen
        name="CreateAppointment"
        component={CreateAppointment}
        options={{
          headerShown: false,
          contentStyle: { borderTopLeftRadius: 50, borderTopRightRadius: 50 },
        }}
      />
    </Stack.Navigator>
  );
};

export default ModalStack;
