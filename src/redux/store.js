import {configureStore} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import reducer from "./reducers";
// redux-persist
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export const persistor = persistStore(store)