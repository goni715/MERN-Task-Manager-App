import React, {Fragment} from 'react';
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import CancelledPage from "../pages/CancelledPage";
import CreatePage from "../pages/CreatePage";
import CompletedPage from "../pages/CompletedPage";
import LoginPage from "../pages/LoginPage";
import NewPage from "../pages/NewPage";
import ErrorPage from "../pages/ErrorPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProgressPage from "../pages/ProgressPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import {getToken} from "../helper/SessionHelper";
import SendOTPPage from "../pages/AccountRecover/SendOTPPage";
import CreatePasswordPage from "../pages/AccountRecover/CreatePasswordPage";
import VerifyOTPPage from "../pages/AccountRecover/VerifyOTPPage";
import FullScreenLoader from "../components/MasterLayout/FullScreenLoader";
import SignUpPage from "../pages/SignUpPage";
import SignUpVerifyOTPPage from "../pages/SignUpVerifyOTPPage";


const AppRoute = () => {


    if(getToken()){

        return (
            <Fragment>

                <HashRouter>
                    <Routes>
                        <Route exact path="/" element={<DashboardPage/>} ></Route>
                        <Route exact path="/Create" element={<CreatePage/>}></Route>
                        <Route exact path="/New" element={<NewPage/>}></Route>
                        <Route exact path="/Progress" element={<ProgressPage/>}></Route>
                        <Route exact path="/Completed" element={<CompletedPage/>}></Route>
                        <Route exact path="/Cancelled" element={<CancelledPage/>}></Route>
                        <Route exact path="/Profile" element={<ProfilePage/>}></Route>
                        <Route exact path="*" element={<ErrorPage/>}></Route>
                    </Routes>
                </HashRouter>
                <FullScreenLoader></FullScreenLoader>
            </Fragment>
        );

    }
    else{

        return (
            <Fragment>

                <HashRouter>
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/Login" replace />}></Route>
                        <Route exact path="/Login" element={<LoginPage/>}></Route>
                        <Route exact path="/Registration" element={<RegistrationPage/>}></Route>
                        <Route exact path="/ForgetPassword" element={<ForgetPasswordPage/>}></Route>
                        <Route exact path="/SendOTP" element={<SendOTPPage/>}></Route>
                        <Route exact path="/VerifyOTP" element={<VerifyOTPPage/>}></Route>
                        <Route exact path="/CreatePassword" element={<CreatePasswordPage/>}></Route>
                        <Route exact path="/SignUp" element={<SignUpPage/>}></Route>
                        <Route exact path="/SignUpVerifyOTP" element={<SignUpVerifyOTPPage/>}></Route>
                        <Route exact path="*" element={<Navigate to="/Login" replace />}></Route>

                    </Routes>
                </HashRouter>
                <FullScreenLoader></FullScreenLoader>

            </Fragment>
        );
    }



};

export default AppRoute;