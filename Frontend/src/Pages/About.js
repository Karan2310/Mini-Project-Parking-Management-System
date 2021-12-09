import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Sakshi from '../assets/Sakshi.jpeg'
import Aditya from '../assets/Aditya.jpg'
import Karan from '../assets/Karandeep.jpg'
import '../App.css'


const About = () => {
    useEffect(() => {
        document.title = "About ";
    }, []);

    const team = [
        {
            name: "Sakshi Pawar",
            img: Sakshi,
            desc: "UI Design | Content ",
        },
        {
            name: "Aditya Rai",
            img: Aditya,
            desc: "Frontend | Backend",
        },
        {
            name: "Karandeep Singh",
            img: Karan,
            desc: "Frontend | Backend",
        },
    ]

    return (
        <>
            <Sidebar />
            <section className="home-section px-3 px-md-0 ps-md-3">
                <div className="container-fluid about">
                    <div className="text">About</div>
                    <h4 className="about-para">Parking Management System is a web-based app used to easily manage your valet parking with some superpowers, making your life easy. Mainly to create a place where all the vehicle records can be stored easily irrespective of the type of device.  Keeping the UI simple makes it more efficient making it easy for all the users. Whichever type of device you have, it's completely made for it, no need to go through the boring installation process, simply login and start using it. <b> SIMPLE YET EFFECTIVE :)</b></h4>
                </div>

                <div className="container-fluid team m-0 p-1 p-md-2 pb-4 mt-5">
                    <h1 className="text-light text-center text-decoration-underline">Our Team</h1>
                    <div className="row d-flex align-items-center justify-content-center pb-4">
                        {team.map((e, index) => {
                            const { name, img, desc } = e;
                            return (
                                <div className="co-12 col-lg-6 col-xl-4 pe-0 pe-md-3 pe-lg-5 mt-5" key={`about${index}`}>
                                    <div className="card container-fluid p-0 m-0">
                                        <div className="row p-0 m-0">
                                            <div className="col-4 col-lg-4 p-0 m-0 overflow-hidden">
                                                <img src={img} alt={name} className="img-fluid" />
                                            </div>

                                            <div className="col-8 col-lg-8 p-2 p-md-3 ps-3 d-flex flex-column justify-content-between">
                                                <div className="">
                                                    <p className="team-name">{name}</p>
                                                    <p className="desc">{desc}</p>
                                                </div>

                                                <div className="social">
                                                    <i class='bx bx-envelope'></i>
                                                    <i class='bx bxl-instagram' ></i>
                                                    <i class='bx bxl-whatsapp' ></i>
                                                    <i class='bx bxl-linkedin' ></i>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
