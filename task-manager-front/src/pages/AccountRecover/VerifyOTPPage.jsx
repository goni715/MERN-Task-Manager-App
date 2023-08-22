import React, {Fragment,Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
//import VerifyOTP from "../../components/AccountRecover/VerifyOTP";
const  VerifyOTP  = React.lazy(() => import("../../components/AccountRecover/VerifyOTP"));



const VerifyOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>

                <VerifyOTP title="VerifyOTP"/>

            </Suspense>
        </Fragment>
    );
};

export default VerifyOtpPage;