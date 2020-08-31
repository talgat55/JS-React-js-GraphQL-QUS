import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
};

if (localStorage.getItem('jwtToken' ) ) {
    const jwtToken =localStorage.getItem('jwtToken');
    if(jwtToken !== "undefined"){


        try {
            const decodedToken = jwtDecode(jwtToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('jwtToken');
            } else {
                initialState.user = decodedToken;
            }
            // valid token format
        } catch(error) {
            localStorage.removeItem('jwtToken');
        }

    }


}

const AuthContext = createContext({
    user: null,
    login: userData => {
    },
    logout: () => {
    }
});

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }

}


const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = userData => {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }
    const logout = userData => {
        localStorage.removeItem('jwtToken');
        dispatch({
            type: 'LOGOUT',
        });
    }
    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )


}

export {
    AuthContext,
    AuthProvider
}