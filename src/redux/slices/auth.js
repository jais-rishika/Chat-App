import axios from '../../utils/axios'
import { createSlice } from "@reduxjs/toolkit";
import { OpenSnackBar,SnackBarSeverity,SnackBarMessage } from './app';

//initial state
const initialState={
  isLoggedIn: false,
  profileImageUrl:"https://res.cloudinary.com/ddncw4pqb/image/upload/v1717325773/samples/profile/profile_gvqm00.jpg",
  token: "",
  email: "",
  isLoading: false,
  name:"",
  about:""
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
        updateEmail(state, action) {
            state.email = action.payload.email;
        },
        updateIsLoading(state, action) {
            state.isLoading = action.payload.isLoading;
        },
        updateProfileUrl(state, action) {
            state.profileImageUrl = action.payload.profileImageUrl;
        },
        updateName(state, action) {
          state.name = action.payload.name;
        },
        updateAbout(state, action) {
          state.about = action.payload.about;
        },
    }
})

export default slice.reducer;

function dispatchIsLoading(dispatch, loadingVal) {
  if (loadingVal) {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
  } else {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: false,
      })
    );
  }
}

function dispatchSnackBar(dispatch, resp, severity) {
  dispatch(OpenSnackBar());
  if (resp.data) {
    dispatch(SnackBarMessage(resp.data));
  } else {
    dispatch(SnackBarMessage(resp));
  }
  dispatch(SnackBarSeverity(severity));
}

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
          console.log(resp.data.url)
          if(resp.data.url){
            dispatch(
              slice.actions.updateProfileUrl({
                profileImageUrl: resp.data.url
              })
            )
          }
          else{
            dispatch(
              slice.actions.updateProfileUrl({
                profileImageUrl: "https://res.cloudinary.com/ddncw4pqb/image/upload/v1717325773/samples/profile/profile_gvqm00.jpg"
              })
            )
          }
            dispatch(slice.actions.updateAbout({about: resp.data.about}))
            dispatch(slice.actions.updateName({name: resp.data.name}))
            dispatch(
                slice.actions.login({
                    isLoggedIn: true,
                    token: resp.data.token
                })
            )
            dispatchSnackBar(dispatch,resp,"success")
            dispatchIsLoading(dispatch, false)

            window.location.href="/app"
        })
        .catch((err)=>{
            console.log(err);
            dispatchSnackBar(dispatch,err,"error")
            dispatchIsLoading(dispatch, false)
        })
    }
}

//logout user
export function logOutUser(){
    return async(dispatch,getState)=>{
        dispatch(slice.actions.logout())
        window.location.href="/auth/login"
    }
}

//resetpassword
export function ResetPassword(formValues){
  return async(dispatch,getState)=>{
    dispatchIsLoading(dispatch, true);
    axios
    .post(
      "api/v1/auth/forgot-password",
      {...formValues},
      {headers:{"Content-Type": "application/json"}}
    )
      .then((resp) => {
          console.log("here")
          console.log(resp);
          dispatchSnackBar(dispatch, resp, "success");
          dispatchIsLoading(dispatch, false);
          
        })
        .catch((err) => {
          console.log(err);
          dispatchSnackBar(dispatch, err, "error");
          dispatchIsLoading(dispatch, false);
        });
  }

}

export function newPassword(formValues) {
    return async (dispatch, getState) => {
        dispatchIsLoading(dispatch, true);
      axios
        .post(
          "/api/v1/auth/reset-password",
          {
            ...formValues,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          dispatchSnackBar(dispatch, resp, "success");
          dispatchIsLoading(dispatch, false);
  
          window.location.href = "/auth/login";
        })
        .catch((err) => {
          console.log(err);
          dispatchSnackBar(dispatch, err, "error");
          dispatchIsLoading(dispatch, false);
        });
    };
  }
  
  export function RegisterUser(formValues) {
    return async (dispatch, getState) => {
        dispatchIsLoading(dispatch, true);
      axios
        .post(
          "/api/v1/auth/register",
          {
            ...formValues,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          dispatch(slice.actions.updateEmail({ email: formValues.email }));
          dispatchIsLoading(dispatch, resp, "success");
          dispatchIsLoading(dispatch, false);
  
          window.location.href = "/auth/verify";
        })
        .catch((err) => {
          console.log(err);
          dispatchSnackBar(dispatch, err, "error");
          dispatchIsLoading(dispatch, false);
        });
    };
  }
  
  export function VerifyEmail(formValues) {
    return async (dispatch, getState) => {
        dispatchIsLoading(dispatch, true);
      axios
        .post(
          "/api/v1/auth/verify-otp",
          {
            ...formValues,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log(resp);
  
          dispatchSnackBar(dispatch, resp, "success");
          dispatchIsLoading(dispatch, false);
  
          window.location.href = "/auth/create-profile";
        })
        .catch((err) => {
          console.log(err);
          dispatchSnackBar(dispatch, err, "error");
          dispatchIsLoading(dispatch, false);
        });
    };
  }

  export function CreateProfile(formValues){
    return async(dispatch,getState)=>{
      dispatchIsLoading(dispatch,true)
      axios.post(
        "/api/v1/auth/create-profile",
        {...formValues},
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((resp)=>{
        console.log(resp);
        if(resp.data.url){
          dispatch(slice.actions.updateProfileUrl({profileImageUrl: resp.data.url}))
          dispatch(slice.actions.updateName({name: resp.data.name}))
          dispatch(slice.actions.updateAbout({about: resp.data.about}))
        }
        else{
          dispatch(slice.actions.updateProfileUrl({profileImageUrl: "https://res.cloudinary.com/ddncw4pqb/image/upload/v1717325773/samples/profile/profile_gvqm00.jpg"}))
          dispatch(slice.actions.updateName({name: resp.data.name}))
          dispatch(slice.actions.updateAbout({about: resp.data.about}))
        }
        dispatch(slice.actions.login({
          isLoggedIn: true,
          token: resp.data.token
        }))
          dispatchSnackBar(dispatch, resp, "success");
          dispatchIsLoading(dispatch, false);
          window.location.href="/app"
      })
      .catch((err)=>{
        console.log(err)
        dispatchSnackBar(dispatch, err.message, "error");
        dispatchIsLoading(dispatch, false);
      })

      }
    }

    export function DeleteUser(formValues){
      return async(dispatch,getState)=>{
        dispatchIsLoading(dispatch,true)
        axios
        .post(
          "/api/v1/app/delete-account",
          {...formValues},
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then((resp)=>{
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl: "https://res.cloudinary.com/ddncw4pqb/image/upload/v1717325773/samples/profile/profile_gvqm00.jpg"
            })
          )
          dispatch(slice.actions.logout())
          dispatch(slice.actions.updateAbout({about: ""}))
          dispatch(slice.actions.updateName({name: ""}))
          dispatch(slice.actions.updateEmail({email: ""}))

          dispatchSnackBar(dispatch, resp, "error");
          dispatchIsLoading(dispatch, false);
          window.location.href="/auth/register"
        })
        .catch((err) => {
          console.log(err);
          dispatchSnackBar(dispatch, err, "error");
          dispatchIsLoading(dispatch, false);
        });
      }
  }
  