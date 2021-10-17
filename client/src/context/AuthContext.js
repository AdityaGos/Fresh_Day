import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user:{
        _id:"61649909252c5de4515b6e8d",
        username:"Gara",
        email:"gara@gmail.com",
        profilePicture:"person/gara1.jfif",
        desc:"Sand is my demon",
        isAdmin:false,
    },
    isFetching:false,
    error:false



};


export const AuthContext = createContext(INITIAL_STATE);



export const AuthContextProvider =({children}) =>{
    const [state,dispatch] =useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
            }}
            >
                {children}
        </AuthContext.Provider>
    )
}