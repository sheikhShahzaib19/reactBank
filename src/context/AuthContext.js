import React, {useState, useReducer, createContext, useEffect } from 'react'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext()

const initialState = { isAuthenticated: false }

const reducer = ((state, action) => {

    switch (action.type) {
        case 'Login':
            return { isAuthenticated: true }
        case "Logout":
            return { isAuthenticated: false }
        default:
            return state
    }
})

export default function AuthContextProvider(props) {
    // const [loader, setLoader] = useState(true)
    const [user,setUser]=useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                 setUser(user);
                //   const uid = user.uid;                
                dispatch({ type: 'Login' })
                // ...
            } else {
                console.log('User is signed out')
                // ...
            }
            // setLoader(false)
        });
    }, [])

    return (
        <AuthContext.Provider value={{ authentication: state, dispatch,user }}>
            {props.children}
        </AuthContext.Provider>

    )
}
