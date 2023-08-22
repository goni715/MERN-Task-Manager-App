import React, {Fragment,Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const SignUpVerifyOTP = React.lazy(() => import("../components/SignUpVerifyOTP/SignUpVerifyOTP"));


const SignUpVerifyOTPPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <SignUpVerifyOTP title="SignUpVerifyOTP"/>
            </Suspense>

        </Fragment>
    );
};

export default SignUpVerifyOTPPage;