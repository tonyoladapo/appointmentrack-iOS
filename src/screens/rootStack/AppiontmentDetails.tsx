import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AppiontmentDetails = ({ route }: any) => {
  const { item } = route.params;

  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AppiontmentDetails;
