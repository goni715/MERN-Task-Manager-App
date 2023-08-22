import {createSlice} from "@reduxjs/toolkit";
export const OTPSlice=createSlice({
    name:'otp',
    initialState:{
        Email:"",
        OTP:""
    },
    reducers:{
        SetEmail:(state,action)=>{
            state.Email=action.payload
        },
        SetOTPCode:(state,action)=>{
            state.OTP=action.payload
        }
    }
})
export  const {SetEmail,SetOTPCode}=OTPSlice.actions;
export const selectEmail = (state) => state.otp.Email;
export const selectOTP = (state) => state.otp.OTP;
export const OTPSliceReducer = OTPSlice.reducer;
