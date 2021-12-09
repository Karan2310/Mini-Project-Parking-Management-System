import React, { useState } from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [open, setopen] = useState(false)

    return (
        <>
            <div className="d-none d-md-flex">
                <div className={open ? "sidebar open" : "sidebar"}>
                    <div className="logo-details">
                        <i className='bx bxs-parking icon'></i>
                        <div className="logo_name">Parking</div>
                        <i className={open ? "bx bx-menu-alt-right" : "bx bx-menu"} id="btn" onClick={() => setopen(!open)} ></i>
                    </div>
                    <ul className="nav-list">
                        <li>
                            <NavLink to="/dashboard">
                                <i className='bx bx-grid-alt'></i>
                                <span className="links_name">Dashboard</span>
                            </NavLink>
                            <span className="tooltip">Dashboard</span>
                        </li>
                        <li>
                            <NavLink to="/records">
                                <i className='bx bx-book-content' ></i>
                                <span className="links_name">Records</span>
                            </NavLink>
                            <span className="tooltip">Records</span>
                        </li>
                        {/* <li>
                            <NavLink to="/analytics">
                                <i className='bx bx-pie-chart-alt-2' ></i>
                                <span className="links_name">Analytics</span>
                            </NavLink>
                            <span className="tooltip">Analytics</span>
                        </li> */}
                        <li>
                            <NavLink to="/user">
                                <i className='bx bx-user' ></i>
                                <span className="links_name">User </span>
                            </NavLink>
                            <span className="tooltip">User</span>
                        </li>
                        <li>
                            <NavLink to="/about">
                                <i className='bx bx-info-circle'></i>
                                <span className="links_name">About</span>
                            </NavLink>
                            <span className="tooltip">About</span>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Sidebar
