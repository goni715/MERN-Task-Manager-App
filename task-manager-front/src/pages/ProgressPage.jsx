import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Progress from "../components/Progress/Progress";
const Progress = React.lazy(() => import("../components/Progress/Progress"));


const ProgressPage = () => {
    return (
        <Fragment>
            <MasterLayout title="Progress">
                <Suspense fallback={<LazyLoader/>}>
                    <Progress/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProgressPage;