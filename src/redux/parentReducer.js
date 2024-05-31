import { combineReducers } from "@reduxjs/toolkit"
import appReducer from "./slices/app"
import authReducer from "./slices/auth"
import storage from "redux-persist/lib/storage";

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