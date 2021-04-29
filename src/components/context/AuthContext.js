import React, { useReducer } from 'react';

export const AuthContext = React.createContext({});

const initialState = {
    isAuth: false,
    user: null
}

function reducerFunc(state, action) {
    switch(action.type) {
        case "LOGIN":
            console.log(action)
            return {
                isAuth: true,
                user: {
                    email: action.user,
                }
            }
            case "LOGOUT":
                return {
                    isAuth: false,
                    user: null,
                };

                default: 
                return state;
    }
} 

function AuthContextComponent ({children}) {
    const [state, dispatch] = useReducer(reducerFunc, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextComponent;