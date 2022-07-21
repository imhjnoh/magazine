import { async } from "@firebase/util"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {collection, getDocs, addDoc, Timestamp, query, orderBy, limit, doc, deleteDoc, updateDoc} from "firebase/firestore"
import { db, auth } from "./firebase"
import moment from "moment"
import "moment/locale/ko";


export const addPostThunk = createAsyncThunk(
    'post/create',
    async(post) => {
        const doc = await addDoc(collection(db, "posts"), {...post})
        const tmp = {...post}
        let time = tmp['createdAt'].toDate()
        time = moment(time).locale("ko-kr").format("lll");
        tmp['createdAt'] = time
        const res = [doc.id, {...tmp}]
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
            const tmp = x.data()
            let time = tmp['createdAt'].toDate()
            time = moment(time).locale("ko-kr").format("lll");
            tmp['createdAt'] = time

            console.log(tmp)
            res.push([x.id, tmp])
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
export const updatePostThunk = createAsyncThunk(
    'post/update',
    async ({id, data}) => {
        const docRef = doc(db, "posts", id)
        await updateDoc(docRef, data)
        return [id, data]
    }
)
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
        builder.addCase(updatePostThunk.fulfilled, (state, action) => {
            const idx = state.posts.findIndex(x => x[0] == action.payload[0])
            state.posts[idx][1] = {...state.posts[idx][1], ...action.payload[1]}
        })
        builder.addCase(deletePostThunk.fulfilled, (state, action) => {
            const idx = state.posts.findIndex(x => x[0] == action.payload)
            state.posts.splice(idx, 1)
        })
    }
})

export default postSlice.reducer