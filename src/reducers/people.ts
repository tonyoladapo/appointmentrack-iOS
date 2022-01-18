const initial_state = {
  people: [],
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const peopleReducer = (
  state = initial_state,
  { type, payload }: ActionTypes,
) => {
  switch (type) {
    case 'SET_PEOPLE':
      return { ...state, people: payload };

    default:
      return state;
  }
};

export default peopleReducer;
