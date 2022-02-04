import React, { MutableRefObject } from 'react';
import { AppointmentTypes, PersonTypes } from './appointment';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Modalize } from 'react-native-modalize';

export type RootStackParamList = {
  Setup: undefined;
  Main: undefined;
  AppointmentDetails: {
    item: AppointmentTypes;
  };
  PersonDetails: {
    details: PersonTypes;
  };
  CreateAppointmentModal: undefined;
};

export type SetupStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  Home: {
    pickedPerson?: PersonTypes;
    modalRef: MutableRefObject<Modalize | null>;
  };
  People: undefined;
  More: undefined;
  Calendar: undefined;
};

export type ModalStackParamList = {
  CreateAppointment: undefined;
  PersonPicker: undefined;
  CreatePerson: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
export type SetupNavigationProp = StackNavigationProp<SetupStackParamList>;
export type BottomNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
export type ModalNavigationProp = StackNavigationProp<ModalStackParamList>;
