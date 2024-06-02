import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { OpenSnackBar, SnackBarMessage, SnackBarSeverity } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  email: "",
  isLoading: false,
  profileImageUrl:""
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateError(state, action) {
      state.error = action.payload.error;
    },
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
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
  },
});

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

// HOFs (Higher order function)
export function LogInUser(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
    axios
      .post(
        "/api/v1/auth/login",
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
        if (resp.data.url) {
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl: resp.data.url,
            })
          );
        } else {
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl:""
            })
          );
        }
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );

        dispatchSnackBar(dispatch, resp, "success");

        dispatchIsLoading(dispatch, false);
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");

        dispatchIsLoading(dispatch, false);
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
    axios
      .post(
        "/api/v1/auth/forgot-password",
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
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function NewPassword(formValues) {
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
        dispatchSnackBar(dispatch, resp, "success");
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

// export function saveUserProfile(formValues) {
//   return async (dispatch, getState) => {
//     dispatchIsLoading(dispatch, true);
//     axios
//       .post(
//         "/api/v1/auth/create-profile",
//         {
//           ...formValues,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp);
//         if (resp.data.url) {
//           dispatch(
//             slice.actions.updateProfileUrl({ profileImageUrl: resp.data.url })
//           );
//         } else {
//           dispatch(
//             slice.actions.updateProfileUrl({
//               profileImageUrl:
//             })
//           );
//         }
//         dispatch(
//           slice.actions.login({
//             isLoggedIn: true,
//             token: resp.data.token,
//           })
//         );
//         dispatchSnackBar(dispatch, resp, "success");
//         dispatchIsLoading(dispatch, false);
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatchSnackBar(dispatch, err, "error");
//         dispatchIsLoading(dispatch, false);
//       });
//   };
// }