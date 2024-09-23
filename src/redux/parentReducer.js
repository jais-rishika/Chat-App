import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import chatReducer from "./slices/chat";
const parentPersistConfig={
    key: "root",
    storage,
    keyPrefix: "app-"
}
const parentReducer =combineReducers({
    app: appReducer,
    auth: authReducer,
    chat: chatReducer
})

export { parentPersistConfig, parentReducer };
