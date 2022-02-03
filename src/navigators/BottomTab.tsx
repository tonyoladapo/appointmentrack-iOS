import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RootNavigationProp } from '../types/navigation';
import Calendar from '../screens/bottomTabs/Calendar';
import Home from '../screens/bottomTabs/Home';
import More from '../screens/bottomTabs/More';
import People from '../screens/bottomTabs/People';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const { navigate } = useNavigation<RootNavigationProp>();
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigate('CreateAppointmentModal')}
              style={styles.headerBtn}>
              <Text>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={People}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.headerBtn}>
              <Text>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTab;
