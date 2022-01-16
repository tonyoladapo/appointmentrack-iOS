import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import Calendar from '../screens/bottomTabs/Calendar';
import Home from '../screens/bottomTabs/Home';
import More from '../screens/bottomTabs/More';
import People from '../screens/bottomTabs/People';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="People" component={People} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTab;
