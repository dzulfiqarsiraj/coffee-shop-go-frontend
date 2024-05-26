import { combineReducers } from "@reduxjs/toolkit";
// redux-persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
import profile from "./profile";
import cart from "./cart";

const authConfig = {
    key: 'auth',
    storage
}


const reducer = combineReducers({
    auth: persistReducer(authConfig, auth),
    profile,
    cart
})

export default reducer