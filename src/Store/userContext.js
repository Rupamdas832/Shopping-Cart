import { createContext, useContext, useReducer } from "react";
import { UserReducer } from "./userReducer";

const UserContext = createContext();

const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));

let initialState = {
  user: null,
  isUserLogin: false,
};
if (loginStatus?.isUserLogin) {
  initialState = {
    user: {
      _id: loginStatus.userId,
      name: loginStatus.userName,
      email: loginStatus.userEmail,
    },
    isUserLogin: true,
    token: loginStatus.token,
    isLoginModalOpen: false,
  };
} else {
  initialState = {
    user: null,
    isUserLogin: false,
    token: "",
    isLoginModalOpen: false,
  };
}

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
