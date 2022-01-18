import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Setup: undefined;
  Main: undefined;
  AppointmentDetails: any;
  PersonDetails: any;
};

export type SetupStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  People: undefined;
  More: undefined;
  Calendar: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
export type SetupNavigationProp = StackNavigationProp<SetupStackParamList>;
export type BottomNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
