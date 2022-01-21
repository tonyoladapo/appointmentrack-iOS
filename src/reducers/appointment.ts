const initial_state = {
  appointments: [],
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

    default:
      return state;
  }
};

export default appointmentReducer;
