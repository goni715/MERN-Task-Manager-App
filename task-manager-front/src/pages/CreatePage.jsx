import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Create from "../components/Create/Create";
const Create = React.lazy(() => import("../components/Create/Create"));


const CreatePage = () => {
    return (
        <Fragment>
            <MasterLayout title="Create">
                <Suspense fallback={<LazyLoader/>}>
                    <Create/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CreatePage;