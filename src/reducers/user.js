const initialState = {
  userId: undefined,
  loggedIn: false
};


export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "SIGN_UP_NEW_USER":
      return {
        ...state,
        userId: action.payload,
        loggedIn: false
      };

    case "LOGIN_USER":
      return {
        ...state,
        userId: action.payload,
        loggedIn: true
      };


    default:
      return state;
  }
};
