import {configureStore} from "@reduxjs/toolkit";
import {settingsSliceReducer} from "../state-slice/settings-slice";
import {taskSliceReducer} from "../state-slice/task-slice";
import {summarySliceReducer} from "../state-slice/summary-slice";
import {profileSliceReducer} from "../state-slice/profileSlice";
import {OTPSliceReducer} from "../state-slice/OTPSlice";

export default configureStore({

    reducer:{
        settings:settingsSliceReducer,
        task:taskSliceReducer,
        summary:summarySliceReducer,
        profile:profileSliceReducer,
        otp:OTPSliceReducer
    }
})