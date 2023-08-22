import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import New from "../components/New/New";
const New = React.lazy(() => import("../components/New/New"));


const NewPage = () => {
    return (
        <Fragment>
            <MasterLayout title="New">
                <Suspense fallback={<LazyLoader/>}>
                    <New/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NewPage;