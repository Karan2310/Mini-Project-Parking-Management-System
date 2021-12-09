import Sidebar from "../Components/Sidebar";
import Rightpanel from "../Components/Rightpanel";
import Vehicle from "../Components/Vehicle";

import React, { Component } from "react";
import { deleteParkingData, getVehicleParked } from "../_services/_parkingData";
import { vehicleTypes } from "../Constants";

export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carsData: null,
      bikeData: null,
      heavyData: null,
      carError: false,
      bikeError: false,
      heavyError: false,
    };
  }

  setError = (vehicleType) => {
    switch (vehicleType) {
      case vehicleTypes.CAR:
        return this.setState({ carError: true });
      case vehicleTypes.BIKE:
        return this.setState({ bikeError: true });
      default:
        return this.setState({ heavyError: true });
    }
  };

  setVehicleData = (vehicleType, vehicleData) => {
    switch (vehicleType) {
      case vehicleTypes.CAR:
        return this.setState({ carError: false, carData: vehicleData });
      case vehicleTypes.BIKE:
        return this.setState({ bikeError: false, bikeData: vehicleData });
      default:
        return this.setState({ heavyError: false, heavyData: vehicleData });
    }
  };

  fetchAndSetParkingData = () => {
    getVehicleParked(vehicleTypes.CAR)
      .then((response) => {
        if (
          response &&
          response["data"] &&
          response["data"]["parked_count"] > 0
        )
          this.setVehicleData(vehicleTypes.CAR, { ...response["data"] });
        else throw new Error("No Data found");
      })
      .catch((error) => this.setError(vehicleTypes.CAR));

    getVehicleParked(vehicleTypes.BIKE)
      .then((response) => {
        if (
          response &&
          response["data"] &&
          response["data"]["parked_count"] > 0
        )
          this.setVehicleData(vehicleTypes.BIKE, { ...response["data"] });
        else throw new Error("No Data found");
      })
      .catch((error) => this.setError(vehicleTypes.BIKE));

    getVehicleParked(vehicleTypes.HEAVY)
      .then((response) => {
        if (
          response &&
          response["data"] &&
          response["data"]["parked_count"] > 0
        )
          this.setVehicleData(vehicleTypes.HEAVY, { ...response["data"] });
        else throw new Error("No Data found");
      })
      .catch((error) => this.setError(vehicleTypes.HEAVY));
  };

  componentDidMount() {
    document.title = "Records";

    this.fetchAndSetParkingData();
  }

  getRenderBikeData = () => {
    const { bikeError, bikeData } = this.state;

    if (!bikeData && !bikeError)
      return (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div
            class="spinner-border text-light d-flex align-items-center justify-content-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    else if (bikeError)
      return (
        <div className="d-flex align-items-center justify-content-cneter h-100 w-100">
          <h3 className="text-center w-100">No bikes parked</h3>
        </div>
      );

    return (
      <div className="container data">
        {bikeData["vehicles_parked"].map((vehicleData, index) => (
          <Vehicle
            vehicleData={vehicleData}
            key={"bike_" + index.toString()}
            partialId={"bike_acc_" + index.toString()}
            deleteVehicle={this.collectFareAndRemoveVehicle}
          />
        ))}
      </div>
    );
  };

  getRenderCarData = () => {
    const { carError, carData } = this.state;

    if (!carData && !carError)
      return (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div
            class="spinner-border text-light d-flex align-items-center justify-content-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    else if (carError)
      return (
        <div className="d-flex align-items-center justify-content-cneter h-100 w-100">
          <h3 className="text-center w-100">No cars parked</h3>
        </div>
      );

    return (
      <div className="container data">
        {carData["vehicles_parked"].map((vehicleData, index) => (
          <Vehicle
            vehicleData={vehicleData}
            key={"car_" + index.toString()}
            partialId={"car_acc_" + index.toString()}
            deleteVehicle={this.collectFareAndRemoveVehicle}
          />
        ))}
      </div>
    );
  };


  getRenderHeavyData = () => {
    const { heavyError, heavyData } = this.state;

    if (!heavyData && !heavyError)
      return (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div
            class="spinner-border text-light d-flex align-items-center justify-content-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    else if (heavyError)
      return (
        <div className="d-flex align-items-center justify-content-cneter h-100 w-100">
          <h4 className="text-center w-100">No heavy vehicles parked</h4>
        </div>
      );

    return (
      <div className="container data">
        {heavyData["vehicles_parked"].map((vehicleData, index) => (
          <Vehicle
            vehicleData={vehicleData}
            key={"heavy_" + index.toString()}
            partialId={"heavy_acc_" + index.toString()}
            deleteVehicle={this.collectFareAndRemoveVehicle}
          />
        ))}
      </div>
    );
  };

  renderRecordFor(vehicleType) {
    switch (vehicleType) {
      case vehicleTypes.CAR:
        return this.getRenderCarData();
      case vehicleTypes.BIKE:
        return this.getRenderBikeData();
      default:
        return this.getRenderHeavyData();
    }
  }

  collectFareAndRemoveVehicle = async (vehicleId) => {
    if (window.confirm("Are you sure you want to remove this vehicle ?")) {
      await deleteParkingData(vehicleId);
      this.fetchAndSetParkingData();
    }
  };

  render() {
    return (
      <>
        <Sidebar />
        <section className="home-section px-3 px-md-0 ps-md-2">
          <div className="container-fluid records">
            <div className="row">
              <div className="col-lg-9 pe-md-3">
                <div className="text">Records</div>
                <div className="row ">
                  <div className="col-lg-4 pe-0 pe-lg-4 ">
                    <div className="container-fluid vehicle-card my-4 mt-lg-0">
                      <h2>Bike</h2>
                      {this.renderRecordFor(vehicleTypes.BIKE)}
                    </div>
                  </div>
                  <div className="col-lg-4 pe-0 pe-lg-4 ">
                    <div className="container-fluid vehicle-card my-4 mt-lg-0">
                      <h2>Car</h2>
                      {this.renderRecordFor(vehicleTypes.CAR)}
                    </div>
                  </div>
                  <div className="col-lg-4 pe-0 pe-lg-4 ">
                    <div className="container-fluid vehicle-card my-4 mt-lg-0">
                      <h2>Heavy</h2>
                      {this.renderRecordFor(vehicleTypes.HEAVY)}
                    </div>
                  </div>
                </div>
              </div>
              <Rightpanel
                onRecordsPage={true}
                refreshData={this.fetchAndSetParkingData}
              />
            </div>
          </div>
        </section>
      </>
    );
  }
}
