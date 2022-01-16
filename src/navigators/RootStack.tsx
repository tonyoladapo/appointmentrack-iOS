import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Setup from '../screens/rootStack/Setup';
import Main from '../screens/rootStack/Main';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const user = null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Setup" component={Setup} />
        ) : (
          <>
            <Stack.Screen name="Main" component={Main} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
