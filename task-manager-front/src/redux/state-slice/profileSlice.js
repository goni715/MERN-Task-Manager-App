import {createSlice} from "@reduxjs/toolkit";
export const profileSlice=createSlice({
    name:'profile',
    initialState:{
        ProfileData:[],
    },
    reducers:{
        SetProfile:(state,action)=>{
            state.ProfileData=action.payload
        },
        SetClass:(state,action)=>{
            state.ShowBtn=action.payload
        }
    }
})
export  const {SetProfile}=profileSlice.actions;
export const selectProfileData = (state) => state.profile.ProfileData;
export const profileSliceReducer = profileSlice.reducer;
