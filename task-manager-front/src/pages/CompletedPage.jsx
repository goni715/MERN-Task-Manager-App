import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Completed from "../components/Completed/Completed";
const Completed = React.lazy(() => import("../components/Completed/Completed"));


const CompletedPage = () => {
    return (
        <Fragment>
            <MasterLayout title="Completed" >
                <Suspense fallback={<LazyLoader/>}>
                    <Completed/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompletedPage;