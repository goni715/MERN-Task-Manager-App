import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Login from "../components/Login/Login";
const Login = React.lazy(() => import("../components/Login/Login"));


const LoginPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Login title="Login"/>
            </Suspense>
        </Fragment>
    );
};

export default LoginPage;