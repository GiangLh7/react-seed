const initialState = {
  isDrawerOpen: false,
};

const configuration = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_DRAWER':
      return Object.assign({}, state, {
        isDrawerOpen: false
      });
    case 'OPEN_DRAWER':
      return Object.assign({}, state, {
        isDrawerOpen: true
      });
    default:
      return state;
  }
};

export default configuration;
