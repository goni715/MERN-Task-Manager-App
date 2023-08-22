import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Cancelled from "../components/Cancelled/Cancelled";
const Cancelled = React.lazy(() => import("../components/Cancelled/Cancelled"));


const CancelledPage = () => {
    return (
        <Fragment>
               <MasterLayout title="Cancelled">
                   <Suspense fallback={<LazyLoader/>}>
                       <Cancelled/>
                   </Suspense>
               </MasterLayout>
        </Fragment>
    );
};

export default CancelledPage;