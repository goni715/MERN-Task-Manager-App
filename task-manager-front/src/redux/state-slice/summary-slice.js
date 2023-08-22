import {createSlice} from "@reduxjs/toolkit";
export const summarySlice=createSlice({
    name:'summary',
    initialState:{
        TotalTask:[]
    },
    reducers:{
        SetSummary:(state,action)=>{
            state.TotalTask=action.payload
        }
    }
})
export  const {SetSummary}=summarySlice.actions;
export const selectTotalTask = (state) => state.summary.TotalTask;
export const summarySliceReducer = summarySlice.reducer;
