import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
//import Dashboard from "../components/Dashboard/Dashboard";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Dashboard = React.lazy(() => import("../components/Dashboard/Dashboard"));

const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout title="Home">
               <Suspense fallback={<LazyLoader/>}>

                    <Dashboard/>

               </Suspense>
            </MasterLayout>



        </Fragment>
    );
};

export default DashboardPage;