const initial_state = {
  appointments: [],
  pickedPerson: null,
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const appointmentReducer = (
  state = initial_state,
  { type, payload }: ActionTypes,
) => {
  switch (type) {
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: payload };

    case 'SET_PICKED_PERSON':
      return { ...state, pickedPerson: payload };

    default:
      return state;
  }
};

export default appointmentReducer;
