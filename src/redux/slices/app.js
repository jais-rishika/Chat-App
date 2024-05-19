import { createSlice } from "@reduxjs/toolkit";
import {dispatch} from "../store"

const initialState={
    sidebar:{
        open:false,
        sectionType: "CONTACT"
    }
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
    },
})

export default slice.reducer;

export function ToggleSideBar(){
    return async()=>{
        dispatch(slice.actions.toggleSideBar());
    }
}

export function UpdateSidebarType(type){
    return async()=>{
        dispatch(slice.actions.updateSidebarType({type,}));
    }
}