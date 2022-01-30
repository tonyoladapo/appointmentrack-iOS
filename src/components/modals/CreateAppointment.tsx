import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface Props {
  modalRef: React.RefObject<Modalize>;
  children: React.ReactNode;
}

const CreateAppointment = ({ modalRef, children }: Props) => {
  const { height } = useWindowDimensions();
  const modalHeight = height * 0.9;

  return (
    <Modalize ref={modalRef} modalHeight={modalHeight}>
      {children}
    </Modalize>
  );
};

const styles = StyleSheet.create({});

export default CreateAppointment;
