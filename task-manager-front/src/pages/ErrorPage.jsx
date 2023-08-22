import React, {Fragment, Suspense} from 'react';
//import Error from "../components/Error/Error";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Error = React.lazy(() => import("../components/Error/Error"));


const ErrorPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>

                <Error title="Error"/>

            </Suspense>
        </Fragment>



    );
};

export default ErrorPage;