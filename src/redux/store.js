import { configureStore } from "@reduxjs/toolkit";
import {useDispatch as useAppDispatch
    ,useSelector as useAppSelector} from "react-redux";
import { persistReducer,persistStore } from "redux-persist";
import {parentPersistConfig,parentReducer} from "./parentReducer";

const store=configureStore({
    reducer: persistReducer(parentPersistConfig,parentReducer),//parent reducers
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: true
        }),
    
});
const persistor= persistStore(store);
const {dispatch} =store;
const useSelector=useAppSelector;
const useDispatch=()=>useAppDispatch();

export{store,persistor,dispatch,useSelector,useDispatch};