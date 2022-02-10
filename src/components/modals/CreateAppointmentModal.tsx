import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/main';
import ModalStack from '../../navigators/ModalStack';

const AnimateView = Animated.createAnimatedComponent(View);

const CreateAppointmentModal = () => {
  const { appointmentModalState } = useSelector(
    ({ modal }: ReducerTypes) => modal,
  );

  const { height } = useWindowDimensions();
  const modalHeight = height * 0.9;

  const { goBack } = useNavigation();

  const modalRef = React.useRef<Modalize>(null);

  useEffect(() => {
    if (appointmentModalState) modalRef.current?.open();
    else modalRef.current?.close();
  }, [appointmentModalState]);

  return (
    <Modalize
      ref={modalRef}
      modalHeight={modalHeight}
      onClosed={goBack}
      customRenderer={
        <AnimateView style={{ flex: 1 }}>
          <ModalStack />
        </AnimateView>
      }
    />
  );
};

export default CreateAppointmentModal;
