import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableWithoutFeedbackProps,
} from 'react-native';

interface Props extends TouchableWithoutFeedbackProps {
  children: React.ReactNode;
}

const DismissKeyboardView = ({ children }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;

const styles = StyleSheet.create({});
