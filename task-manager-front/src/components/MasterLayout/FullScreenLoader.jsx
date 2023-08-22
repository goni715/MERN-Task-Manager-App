import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {selectLoader} from "../../redux/state-slice/settings-slice";
const FullScreenLoader = () => {


    const Loader = useSelector(selectLoader);

    return (
        <Fragment>
            <div className={Loader+" LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </Fragment>
    );
};
export default FullScreenLoader;