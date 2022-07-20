import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slice"
import postReducer from "./postSlice"
const store = configureStore({reducer: {
    user: userReducer,
    post: postReducer
}})
export default store;