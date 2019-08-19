
const actions = {};

actions.addData = function(data) {
  return {
    type: 'ADD_DATA',
    data
  };
};

export { actions };

const initialState = {
  data: [],
};

export default function placeholder(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        data: [ ...state.data, action.data ],
      };

    default: return state;
  }
}
