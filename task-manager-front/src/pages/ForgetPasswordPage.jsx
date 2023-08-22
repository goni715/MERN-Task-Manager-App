import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
const ForgetPassword = React.lazy(() => import("../components/ForgetPassword/ForgetPassword"));


const ForgetPasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <ForgetPassword/>
            </Suspense>
        </Fragment>
    );
};

export default ForgetPasswordPage;