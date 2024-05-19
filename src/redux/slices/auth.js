import axios from '../../utils/axios'
import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from '../store';

//initial state
const initialState={
    isLoggedIn: false,
    token: "",
}
//create slice
const slice=createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state,action){
            state.isLoggedIn=action.payload.isLoggedIn;
            state.token=action.payload.token;
        },
        logout(state,action){
            state.isLoggedIn= false;
            state.token="";
        },
    }
})

export default slice.reducer;

//loginuser
export function loginUser(formValues){
    return async(dispatch,getState)=>{
        axios
        //path,formvalues,other option(headers)
        .post(
            "api/v1/auth/login",
            {
                ...formValues
            },
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        )
        .then((resp)=>{
            dispatch(
                slice.actions.login({
                    isLoggedIn: true,
                    token: resp.data.token
                })
            )
            console.log(resp);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

//logout user
export function logOut(){
    return async(dispatch,getState)=>{
        dispatch(slice.actions.logout())
    }
}

//resetpassword
export function resetPassword(formValues){
    return async(dispatch,getState)=>{
        axios
        .post(
            "api/v1/auth/reset-password",
            {...formValues},
            {headers:{"Content-Type": "application/json"}}
        )
        .then((resp)=>resp)
        .catch((err)=> err)
    }

}