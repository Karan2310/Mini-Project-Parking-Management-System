import React, { useEffect } from "react";
import "../App.css";
import Sidebar from "../Components/Sidebar";
import Rightpanel from "../Components/Rightpanel";
import CategoryChart from "../Components/CategoryChart";
import SlotsPieChart from "../Components/SlotsPieChart";
import FareHorizontalChart from "../Components/FareHorizontalChart";

const Analytics = () => {
  useEffect(() => {
    document.title = "Analytics";
  }, []);
  return (
    <>
      <Sidebar />
      <section className="home-section px-3 px-md-0 ps-md-3">
        <div className="container-fluid m-0 p-0 Analytics">
          <div className="row p-0 m-0">
            <div className="col-lg-9">
              <div className="text ms-3">Analytics</div>
              {/* Main Row 1 */}
              <div className="row">
                {/* Row 1A */}
                <div className="col-md-6 col-lg-6 pe-0 pe-md-4 mb-3 mb-md-0 ps-0 ps-md-2">
                  <div
                    className="c   ol-md-12 col-lg-12 card  p-3 my-2 my-md-0"
                    style={{
                      backgroundColor: "#fff",
                      height: "45vh",
                    }}
                  >
                    <h4 style={{ color: "#111" }}>Category</h4>
                    <CategoryChart />
                  </div>
                </div>
                {/* Row 1B */}
                <div className="col-sm-12 col-md-6 col-lg-6 p-0 pe-md-4 pe-lg-5">
                  <div
                    className="c   ol-md-12 col-lg-12 card  p-3 my-2 my-md-0"
                    style={{
                      backgroundColor: "#63B4B8",
                      height: "45vh",
                    }}
                  >
                    <h4 style={{ color: "#111" }}>Slots Empty</h4>
                    <h1 className="highlight m-0 p-0" style={{ color: "#fff" }}>
                      13
                    </h1>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="row my-4 py-md-0 row2">
                {/* Main Row 2 */}
                <div className="row">
                  {/* Row 2A */}
                  <div className="col-md-6 col-lg-7 ps-md-2 pe-md-4">
                    <div
                      className="col-md-12 col-lg-12 card  p-3 my-2 my-md-0 "
                      style={{ backgroundColor: "#916BBF", height: "60vh" }}
                    >
                      <h4 style={{ color: "#111" }}>Fare</h4>
                      <FareHorizontalChart />
                    </div>
                  </div>
                  {/* Row 2B */}
                  <div className="col-sm-12 col-md-6 col-lg-5 p-0 pe-md-4 pe-lg-5 pt-3 pt-md-0 my-3 my-md-0">
                    <div
                      className="col-md-12 col-lg-12 card  p-3  my-md-0"
                      style={{
                        backgroundColor: "rgb(90, 90, 90)",
                        height: "60vh",
                      }}
                    >
                      <h4 style={{ color: "#fff" }}>Slots</h4>
                      <div className="w-100 h-100 pb-2">
                        <SlotsPieChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Rightpanel />
          </div>
        </div>
      </section>
    </>
  );
};

export default Analytics;
