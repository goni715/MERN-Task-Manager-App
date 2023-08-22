import React, {Fragment,Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
//import SendOTP  from "../../components/AccountRecover/SendOTP";
const SendOTP = React.lazy(() => import("../../components/AccountRecover/SendOTP"));

const SendOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>

                 <SendOTP title="SendOTP"/>

            </Suspense>
        </Fragment>
    );
};

export default SendOtpPage;