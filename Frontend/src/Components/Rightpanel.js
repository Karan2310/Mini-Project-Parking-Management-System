import React, { useState, useEffect } from 'react'
import '../App.css'
import Clock from './Clock'
import AddVehicle from './AddVehicle'

const Rightpanel = (props) => {

    var [date, setDate] = useState('0')


    useEffect(() => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dateObj = new Date();
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = month + '\n' + day + ', ' + year;
        setDate(output);
    });

    return (
        <>
            <AddVehicle onRecordsPage={props['onRecordsPage']} refreshData={props['refreshData']} />

            <div className="col-md-3 right-panel d-none d-lg-block py-2 px-3 overflow-hidden position-relative">

                <div className="container-fluid px-2 py-2 m-0">
                    <h3 className="p-2">{date}</h3>
                </div>

                <div className="p-2 container-fluid">
                    <div className="clockdiv container-fluid w-100 d-flex align-items-center justify-items-center clockdiv">
                        <Clock />
                    </div>
                </div>
                {props['onRecordsPage'] && <div className="container audiv px-3">
                    <div
                        className="container adduser"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        <i className="bx bx-plus"></i>
                        <h4>Add a new vehicle</h4>
                    </div>
                </div>}
            </div>

            {
                props['onRecordsPage'] && <div className="mobile-add d-block d-lg-none">
                    <div
                        className="container adduser"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        <i className="bx bx-plus"></i>
                    </div>
                </div>
            }
        </>
    )
}

export default Rightpanel
