import React from "react";

export default function Vehicle({ partialId, vehicleData, deleteVehicle }) {
  const { id, vehicalType, vechicleNumber, driverName, startTime, fare } =
    vehicleData;
  return (
    <div
      className="accordion accordion-flush my-2"
      id={"vehicleDataAccordian" + partialId.toString()}
    >
      <div className="accordion-item">
        <h2
          className="accordion-header"
          id={"flush-headingOne" + partialId.toString()}
        >
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#flush-collapseOne" + partialId.toString()}
            aria-expanded="false"
            aria-controls={"flush-collapseOne" + partialId.toString()}
          >
            <span className="">{vechicleNumber.toUpperCase()}</span>
          </button>
        </h2>
        <div
          id={"flush-collapseOne" + partialId.toString()}
          className="accordion-collapse collapse"
          aria-labelledby={"flush-headingOne" + partialId.toString()}
          data-bs-parent={"#vehicleDataAccordian" + partialId.toString()}
        >
          <div className="accordion-body p-0 ps-1">
            <ul className="list-group list-group-flush bg-transparent border-0 pl-0 text-left">
              <li className="text-light pl-0 list-group-item bg-transparent border-0">
                Name: {driverName}
              </li>
              <li className="text-light pl-0 list-group-item bg-transparent border-0">
                Number: {vechicleNumber.toUpperCase()}
              </li>
              <li className="text-light pl-0 list-group-item bg-transparent border-0">
                Time In: {startTime}
              </li>
              <li className="text-light pl-0 list-group-item bg-transparent border-0">
                Total Fare: Rs {fare}
              </li>
              <li>
                <div className="btn btn-outline-primary btn-sm float-end me-4" onClick={() => deleteVehicle(id)}>
                  <div className="d-flex align-items-center justify-content-center">
                    <i class='bx bx-money me-2'></i>
                    Collect Fare
                  </div>
                </div>
              </li>
            </ul>


          </div>
        </div>
      </div>
    </div>
  );
}
