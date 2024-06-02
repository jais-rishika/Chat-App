import { combineReducers } from "@reduxjs/toolkit"
import appReducer from "./slices/app"
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth"
const parentPersistConfig={
    key: "root",
    storage,
    keyPrefix: "app-"
}
const parentReducer =combineReducers({
    app: appReducer,
    auth: authReducer,
})

export {parentPersistConfig , parentReducer};