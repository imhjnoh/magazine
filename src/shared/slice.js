import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const loginThunk = createAsyncThunk(
    'user/login',
    async({uid, pw}) => {
        console.log("hey~");
        const user = await signInWithEmailAndPassword(auth, uid, pw)
        return user
    }
)
const userSlice = createSlice({
    name: "user",
    initialState: {user: null},
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.user = action.payload
            console.log(action.payload)
        })
    }
})

export default userSlice.reducer;