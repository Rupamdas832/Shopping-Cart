export const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload.user,
        isUserLogin: true,
        token: action.payload.token,
      };
    case "USER_LOGOUT":
      return { ...state, user: null, isUserLogin: false, token: "" };
    default:
      return state;
  }
};
