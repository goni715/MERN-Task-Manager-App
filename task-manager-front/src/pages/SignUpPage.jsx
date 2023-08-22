import React, {Fragment,Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const SignUp = React.lazy(() => import("../components/SignUp/SignUp"));

const SignUpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <SignUp title="Sign Up"/>
            </Suspense>
        </Fragment>
    );
};

export default SignUpPage;