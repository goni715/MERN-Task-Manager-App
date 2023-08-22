import {createSlice} from "@reduxjs/toolkit";
import {settingsSlice} from "./settings-slice";
export const taskSlice=createSlice({
    name:'task',
    initialState:{
        New:[],
        Completed:[],
        Progress:[],
        Cancelled:[]
    },
    reducers:{
        SetNewTask:(state,action)=>{
            state.New=action.payload
        },
        SetCompletedTask:(state,action)=>{
            state.Completed=action.payload
        },
        SetProgressTask:(state,action)=>{
            state.Progress=action.payload
        },
        SetCancelledTask:(state,action)=>{
            state.Cancelled=action.payload
        }

    }
})

export  const {SetNewTask,SetCompletedTask,SetProgressTask,SetCancelledTask}=taskSlice.actions;
export const selectNew = (state) => state.task.New;
export const selectCompleted = (state) => state.task.Completed;
export const selectProgress = (state) => state.task.Progress;
export const selectCancelled = (state) => state.task.Cancelled;
export const taskSliceReducer = taskSlice.reducer;


export default  taskSlice.reducer;