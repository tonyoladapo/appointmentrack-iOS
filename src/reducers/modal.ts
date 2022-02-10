const initial_state = {
  appointmentModalState: false,
  personModalState: false,
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const modalReducer = (
  state = initial_state,
  { type, payload }: ActionTypes,
) => {
  switch (type) {
    case 'TOGGLE_APPOINTMENT_MODAL':
      return { ...state, appointmentModalState: payload };

    case 'TOGGLE_PERSON_MODAL':
      return { ...state, personModalState: payload };

    default:
      return state;
  }
};

export default modalReducer;
