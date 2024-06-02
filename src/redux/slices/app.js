import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sidebar:{
        open:false,
        sectionType: "CONTACT"
    },
    openSnackBar: false,
    snackBarMessage: null,
    snackBarSeverity: null,
}

const slice=createSlice({
    name: "app",
    initialState,
    reducers:{
        toggleSideBar:(state,action)=>{
            console.log(state.sidebar.open)
            state.sidebar.open= !state.sidebar.open;
        },
        updateSidebarType:(state,action)=>{
            state.sidebar.sectionType = action.payload.sectionType;
        },
        updateOpenSnackBar: (state, action) => {
            state.openSnackBar = action.payload.openSnackBar;
          },
          updateSnackBarMessage: (state, action) => {
            state.snackBarMessage = action.payload.snackBarMessage;
          },
          updateSnackBarSeverity: (state, action) => {
            state.snackBarSeverity = action.payload.snackBarSeverity;
          },
    },
})

export default slice.reducer;

export function ToggleSideBar(){
    return async(dispatch, getState)=>{
        dispatch(slice.actions.toggleSideBar());
    }
}

export function UpdateSidebarType(type){
    return async(dispatch, getState)=>{
        dispatch(slice.actions.updateSidebarType({type,}));
    }
}

export function OpenSnackBar() {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateOpenSnackBar({ openSnackBar: true }));
  
      setTimeout(() => {
        dispatch(CloseSnackBar());
      }, 5000);
    };
  }
  
  export function CloseSnackBar() {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateOpenSnackBar({ openSnackBar: false }));
    };
  }
  
  export function SnackBarMessage(message) {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateSnackBarMessage({ snackBarMessage: message }));
    };
  }
  
  export function SnackBarSeverity(severity) {
    return async (dispatch, getState) => {
      dispatch(
        slice.actions.updateSnackBarSeverity({ snackBarSeverity: severity })
      );
    };
  }