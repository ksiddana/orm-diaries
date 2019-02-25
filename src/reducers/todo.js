const initialState = {
  todos: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "FETCH_TODO_LIST":
      return {
        ...state,
        todos: action.payload
      };
    case "DELETE_TODO_LIST":
    return {
      ...state,
      todos: []
    }

    default:
      return state;
  }
};
