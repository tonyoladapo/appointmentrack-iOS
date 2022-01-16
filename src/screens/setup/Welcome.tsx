import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SetupNavigationProp } from '../../types/navigation';

const Welcome = () => {
  const { navigate } = useNavigation<SetupNavigationProp>();

  return (
    <View style={styles.conatiner}>
      <TouchableOpacity
        onPress={() => navigate('Login')}
        style={{ padding: 16, backgroundColor: 'tomato', borderRadius: 7 }}>
        <Text>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
