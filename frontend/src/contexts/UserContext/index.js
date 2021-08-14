import { createContext, useReducer } from "react";
const acesstoken = localStorage.getItem("token");

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

const initialState = {
    authenticated: acesstoken ? true : false,
    username: "",
    name: "",
    email: "",
    accessToken: ""
};

const UserReducer = (state, action) => {
    switch (action.type) {
        case "setUser": {
            if (action.payload.accessToken) {
                localStorage.setItem("token", action.payload.accessToken);
            }
            return { ...action.payload };
        }
        default:
            return state;
    }
};
