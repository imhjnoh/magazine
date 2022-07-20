import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {collection, getDocs, addDoc, Timestamp, query, orderBy} from "firebase/firestore"
import { db, auth } from "./firebase"

export const addPostThunk = createAsyncThunk(
    'post/create',
    async(post) => {
        const doc = await addDoc(collection(db, "posts"), {...post})
        const res = {...post}
        console.log(res);
        return res
    }
)
export const loadPostThunk = createAsyncThunk(
    'post/load',
    async () => {
        const docs = await getDocs(query(collection(db, "posts"), orderBy('createdAt', 'desc')));
        console.log(docs)
        let res = []
        docs.forEach((x) => {
            res.push(x.data())
        })
        return res
    }
)
const postSlice = createSlice({
    name: "post",
    initialState: {posts: []},
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(addPostThunk.fulfilled, (state, action) => {
            state.posts.unshift(action.payload)
        })
        builder.addCase(loadPostThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            state.posts = action.payload
        })
    }
})

export default postSlice.reducer