import { async } from "@firebase/util"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {collection, getDocs, addDoc, Timestamp, query, orderBy, limit, doc, deleteDoc} from "firebase/firestore"
import { db, auth } from "./firebase"

export const addPostThunk = createAsyncThunk(
    'post/create',
    async(post) => {
        const doc = await addDoc(collection(db, "posts"), {...post})
        const res = [doc.id, {...post}]
        console.log(res);
        return res
    }
)
export const loadPostThunk = createAsyncThunk(
    'post/load',
    async () => {
        const docs = await getDocs(query(collection(db, "posts"), orderBy('createdAt', 'desc'), limit(10)));
        console.log(docs)
        let res = []
        docs.forEach((x) => {
            res.push([x.id, x.data()])
        })
        return res
    }
)
// export const loadMorePostThunk = createAsyncThunk(
//     'post/loadmore',
//     async () => {
//         const docs = 
//     }
// )
export const deletePostThunk = createAsyncThunk(
    'post/delete',
    async (id) => {
        const docRef = doc(db, "posts", id)
        await deleteDoc(docRef);
        return id
    }
)
const postSlice = createSlice({
    name: "post",
    initialState: { posts: []},
    reducers: {
        // setLoading(state, action) {
        //     state.loading = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(addPostThunk.fulfilled, (state, action) => {
            state.posts.unshift(action.payload)
        })
        builder.addCase(loadPostThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            state.posts = action.payload
        })
        builder.addCase(deletePostThunk.fulfilled, (state, action) => {
            const idx = state.posts.findIndex(x => x[0] == action.payload)
            state.posts.splice(idx, 1)
        })
    }
})

export default postSlice.reducer