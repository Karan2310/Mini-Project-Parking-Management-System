import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Rightpanel from "../Components/Rightpanel";
import { NavLink } from "react-router-dom";
import { logoutUser, getLogedInUserData } from "../_services/_authService"

const User = ({ updateLoginStatus }) => {

  const userInfo = getLogedInUserData();
  console.log(userInfo);

  useEffect(() => {
    document.title = "User";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="home-section px-1 px-md-0 ps-md-3">
        <div className="row px-3">
          <div className="col-md-9">
            <div className="text ms-0 ms-md-3">User</div>
            {userInfo.map((data) => (
              <div className="container-fluid p-0 m-0 ms-1">
                <div className="container-fluid p-0 m-0 d-flex align-items-center main-card">
                  <div className="d-flex flex-column flex-md-row">
                    <div>
                      <div className="avatar me-4 me-md-5 overflow-hidden">
                        <i class="bx bxs-user"></i>
                      </div>
                    </div>
                    <div className="info mt-3">
                      <h2>{data.name}</h2>
                      <p>{data.role}</p>
                      <button className="my-2" onClick={() => {
                        logoutUser();
                        updateLoginStatus(false);
                      }}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="general-info mt-5  ">
                  <h3>
                    <span>Name</span> : {data.name}
                  </h3>
                  <h3>
                    <span>Role</span> : {data.role}
                  </h3>
                  <h3>
                    <span>Conatct</span> : {data.contact}
                  </h3>
                  <h3>
                    <span>Organiztion Name</span> : {data.orgName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <Rightpanel />
        </div>
      </section>
    </>
  );
};

export default User;
