import React, { Component } from "react";
import { vehicleTypes } from "../Constants";
import { updateParkingData } from "../_services/_parkingData";
import "../App.css";

export default class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleNumber: "",
      driverName: "",
      vehicleType: vehicleTypes.CAR,
      hasError: false,
      vehicleNumberDirty: false
    };
  }

  maskVehicleNumber = (vehicleNumber) => {
    if (vehicleNumber) {


      const vehicleNumberCopy = vehicleNumber.replaceAll("-", "").replaceAll(" ", "")

      console.log(vehicleNumberCopy);

      if (vehicleNumberCopy.length < 6 || vehicleNumberCopy.length > 10)
        return "";

      else {
        const firstHalfOfNumber = vehicleNumberCopy.slice(0, 6);
        const secondHalfOfNumber = vehicleNumberCopy.slice(6);

        const firstHalfArray = firstHalfOfNumber.split("");
        console.log(firstHalfArray)
        const firstHalfArrayToString = firstHalfArray.map((item, index) => {
          if (index !== 0 && index % 2 !== 0)
            return item + "-";
          return item;
        }).join("");

        return firstHalfArrayToString + secondHalfOfNumber;
      }

    } return vehicleNumber;


  }
  onChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onVehicleNumberBlur = () => {
    const { vehicleNumber, vehicleNumberDirty } = this.state;
    console.log();

    this.setState({
      vehicleNumber: this.maskVehicleNumber(vehicleNumber),
      vehicleNumberDirty: false
    })
  }

  getCurrentFormateddate() {
    const currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, "0");
    var mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    var yyyy = currentDate.getFullYear();

    return dd + "/" + mm + "/" + yyyy;
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { vehicleNumber, driverName, vehicleType } = this.state;

    if (vehicleNumber && driverName && vehicleType) {
      updateParkingData({
        startTime: Date.now().toString(),
        vehicalType: vehicleType,
        vehicleNumber,
        driverName,
      })
        .then((response) => {
          if (response) {
            if (this.props["refreshData"]) {
              this.setState({
                vehicleNumber: "",
                driverName: "",
                vehicleType: vehicleTypes.CAR,
                hasError: false,
              })
              this.props["refreshData"]();
            };
          } else {
            throw new Error("Form submit unsuccessfull");
          }
        })
        .catch((_) => this.setState({ hasError: true }));
    }
  };

  render() {
    return (
      <>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog px-2 px-md-0 mt-3 mt-md-0">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Add Vehicle
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div class="mb-3">
                    <label class="form-label">Vehicle Number</label>
                    <input
                      type="text"
                      class="form-control text-uppercase"
                      id="vehicleNum"
                      placeholder="MH-01-CC-1234"
                      required
                      minLength="6"
                      maxLength="13"
                      name="vehicleNumber"
                      value={this.state.vehicleNumber}
                      onChange={(event) => this.onChange(event)}
                      onBlur={this.onVehicleNumberBlur}
                      autoComplete="off"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Owner Name</label>
                    <input
                      type="text"
                      class="form-control text-capitalize"
                      id="ownerName"
                      required
                      minLength="3"
                      maxLength="40"
                      name="driverName"
                      value={this.state.driverName}
                      onChange={(event) => this.onChange(event)}
                      autoComplete="off"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Select Vehicle Type</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="vehicleType"
                      defaultValue={this.state.vehicleType}
                      onChange={(event) => this.onChange(event)}
                    >
                      <option value={vehicleTypes.BIKE}>Bike</option>
                      <option value={vehicleTypes.CAR}>Car</option>
                      <option value={vehicleTypes.HEAVY}>Heavy</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="btn float-end w-100 mt-3 mb-2 py-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="bx bx-plus"></i>
                      Add
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {this.props["onRecordsPage"] && (
          <div className="mobile-add d-block d-lg-none">
            <div
              className="container adduser"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        )}
      </>
    );
  }
}
