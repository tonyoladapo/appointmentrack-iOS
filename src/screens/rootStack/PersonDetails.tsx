import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PersonDetails = ({ route }: any) => {
  const { details } = route.params;

  return (
    <View>
      <Text>{details.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PersonDetails;
