import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
//import Profile from "../components/Profile/Profile";
const Profile = React.lazy(() => import("../components/Profile/Profile"));


const ProfilePage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Profile title="Profile" />
            </Suspense>
        </Fragment>
    );
};

export default ProfilePage;