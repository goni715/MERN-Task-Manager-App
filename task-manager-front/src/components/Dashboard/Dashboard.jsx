import React, {Fragment, useEffect, useState} from 'react';
import {taskStatusCountRequest, VisitorInsertRequest} from "../../APIServices/CRUDServices";
import {useSelector} from "react-redux";
import {selectTotalTask} from "../../redux/state-slice/summary-slice";
import axios from "axios";

const Dashboard = () => {



    const getVisitorData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/');
        //console.log(res.data);
        //setIP(res.data.IPv4)

        let IP_Data = res.data;
        return IP_Data;

    }



    useEffect(()=>{

        taskStatusCountRequest();

        getVisitorData().then((result)=>{

            let IP_Address = result.IPv4;
            let City = result.city;
            let CountryName = result.country_name;
            let State = result.state;

            VisitorInsertRequest(IP_Address,City,CountryName,State);
        })

    },[])


    const SummaryList = useSelector(selectTotalTask);


    return (

        <Fragment>
            <div className="container">
                <div className="row">

                    {
                        SummaryList.map((item,i)=>{

                      return(

                        <div key={i.toString()} className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="animated fadeInUp">Total {SummaryList[i]._id}</h5>
                                    <h6 className="text-secondary animated fadeInUp">{SummaryList[i].sum}</h6>
                                </div>
                            </div>
                        </div>

                      )

                       })

                    }

                </div>
            </div>
        </Fragment>

    );
};

export default Dashboard;