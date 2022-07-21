import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { getDocs, query, where, collection } from "firebase/firestore";

export const loadUserThunk = createAsyncThunk(
    'user/loaduser',
    async(user) => {
        console.log("hey~");
        const user_docs = await getDocs(query(
        collection(db, "users"), where("user_id","==",user.email)
        ))
        const userdata = []
        user_docs.forEach(x => userdata.push(x.data()))
        return userdata
    }
)
const userSlice = createSlice({
    name: "user",
    initialState: {user: {name: "anonymous", user_id: ""}},
    reducers: {
        logoutUser(state, action) {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadUserThunk.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload
        })
    }
})

export default userSlice.reducer;