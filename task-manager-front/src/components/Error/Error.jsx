import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";

const Error = (props) => {
    return (
        <Fragment>
            <title>{props.title}</title>

            <div className="container text-center containerDiv">
            <div className="">
                <div>
                    <h2 className="h2Tag">404</h2>
                    <h3 className="h3Tag">UH OH! You're lost.</h3>
                    <p className="pTag">
                        The page you are looking for does not exist. How you got here is a
                        mystery. But you can click the button below to go back to the
                        homepage.
                    </p>

                    <NavLink to="/">
                        <Button className="thapaBtn">Go Back to Home</Button>
                    </NavLink>
                </div>
            </div>
            </div>

        </Fragment>
    );
};

export default Error;