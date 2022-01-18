export const setPeople = (people: any[]) => {
  return {
    type: 'SET_PEOPLE',
    payload: people,
  };
};
