import React, { Component } from "react";

export default class CategoriesFilled extends Component {
  render() {
    return (
      <>
        <div className="col-sm-12 col-md-8 col-lg-9 ps-md-2 pe-md-4">
          <div
            className="col-md-12 col-lg-12 card  p-3 my-2 my-md-0 "
            style={{ backgroundColor: "#916BBF" }}
          >
            <h3 style={{ color: "#111" }}>Fares</h3>
            <div className="row mt-3">

              <div className="col-md my-2 my-lg-0">
                <h3 className="text-dark">
                  <i class="bx bx-cycling"></i> Bike
                </h3>
                <h1 className="fw-bold text-light"> <span style={{ fontFamily: "sans-serif" }}>₹</span>20</h1>
              </div>
              <div className="col-md my-2 my-lg-0 ">
                <h3 className="text-dark">
                  <i class="bx bxs-car"></i> Car
                </h3>
                <h1 className="fw-bold text-light"><span style={{ fontFamily: "sans-serif" }}>₹</span>40</h1>
              </div>
              <div className="col-md my-2 my-lg-0">
                <h3 className="text-dark">
                  <i class="bx bxs-truck"></i>Heavy
                </h3>
                <h1 className="fw-bold text-light"><span style={{ fontFamily: "sans-serif" }}>₹</span>70</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
