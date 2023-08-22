import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
//import CreatePassword from "../../components/AccountRecover/CreatePassword";
const  CreatePassword = React.lazy(() => import("../../components/AccountRecover/CreatePassword"));


const CreatePasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>

               <CreatePassword title="CreatePassword"/>

            </Suspense>
        </Fragment>
    );
};

export default CreatePasswordPage;