import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

const Error = () => {
    useEffect(() => {
        document.title = "404!";
    }, []);
    return (
        <>
            <section className="home-section" style={{ position: "initial", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div className="text">404 Page Not Found!</div>
                <NavLink to="/">Back To Dashboard</NavLink>
            </section>
        </>
    )
}

export default Error
