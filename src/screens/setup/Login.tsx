import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { signInWithGoogle, signInAnonymously, authenticating } = useAuth();

  return (
    <View style={[styles.container]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <GoogleSigninButton
          style={{ width: 192, height: 48, borderRadius: 10 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signInWithGoogle}
          disabled={authenticating}
        />

        <TouchableOpacity
          onPress={signInAnonymously}
          style={{ padding: 16 }}
          disabled={authenticating}>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>

      {authenticating && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating={authenticating} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
