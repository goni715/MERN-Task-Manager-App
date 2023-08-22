import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Registration from "../components/Registration/Registration";
const Registration = React.lazy(() => import("../components/Registration/Registration"));


const RegistrationPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Registration title="Registration"/>
            </Suspense>
        </Fragment>
    );
};

export default RegistrationPage;