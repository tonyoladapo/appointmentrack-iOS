import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SetupStackParamList } from '../types/navigation';
import Welcome from '../screens/setup/Welcome';
import Login from '../screens/setup/Login';

const Stack = createStackNavigator<SetupStackParamList>();

const SetupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default SetupStack;
