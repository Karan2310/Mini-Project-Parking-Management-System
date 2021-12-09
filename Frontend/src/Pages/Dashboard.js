import "../App.css";
import Sidebar from "../Components/Sidebar";
import Rightpanel from "../Components/Rightpanel";
import React, { Component } from "react";
import { getSlotsAvailability } from "../_services/_parkingData";
import Error from "./Error.js";
import Categories from "../Components/CategoriesFilled";
import CategoryChart from "../Components/CategoryChart";
import { useNavigate } from "react-router-dom";
import { isStrEmpty, capitalizeStr } from "string_parkourr/lib/string_parkourr";
import { deleteParkingData, getVehicleParked } from "../_services/_parkingData";
import { vehicleTypes } from "../Constants";
import MobileNav from "../Components/MobileNav";

class DashboardState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      slotsData: null,
      hasError: false,
      carsData: null,
      bikeData: null,
      heavyData: null,
      carError: false,
      bikeError: false,
      heavyError: false,
    };
  }

  getVehicleIcon = () => {
    const mostParkedVehicle = this.getMostParked();
    switch (mostParkedVehicle) {
      case vehicleTypes.CAR:
        return <i className="bx bxs-car"></i>;

      case vehicleTypes.BIKE:
        return <i className="bx bx-cycling"></i>;

      case vehicleTypes.HEAVY:
        return <i className="bx bxs-truck"></i>;

      default:
        return <i className="bx bx-checkbox-minus"></i>;
        break;
    }
  };

  isVehicleCountAvaliable = () => {
    const { carError, carData, bikeError, bikeData, heavyData, heavyError } =
      this.state;
    if (
      !carError &&
      carData &&
      !bikeError &&
      bikeData &&
      !heavyError &&
      heavyData
    ) {
      return 100;
    } else if (
      (!carError && !carData) ||
      (!bikeError && !bikeData) ||
      (!heavyError && !heavyData)
    ) {
      return 400;
    }
    return 500;
  };

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

  getCategoryParkingCount = () => {
    const { carData, bikeData, heavyData } = this.state;

    return Object.freeze({
      [vehicleTypes.CAR]: carData["parked_count"] ?? 0,
      [vehicleTypes.BIKE]: bikeData["parked_count"] ?? 0,
      [vehicleTypes.HEAVY]: heavyData["parked_count"] ?? 0,
    });
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
          response["data"]["parked_count"] >= 0
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
          response["data"]["parked_count"] >= 0
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
          response["data"]["parked_count"] >= 0
        )
          this.setVehicleData(vehicleTypes.HEAVY, { ...response["data"] });
        else throw new Error("No Data found");
      })
      .catch((error) => this.setError(vehicleTypes.HEAVY));
  };

  setParkingCountError = () => {
    this.setState((state, props) => ({
      isLoading: false,
      slotsData: { occupied: 1, total: 100, avaliable: 99 },
      hasError: !true,
    }));
  };

  componentDidMount() {
    console.log(this.props);
    document.title = capitalizeStr("dashboard");
    this.setParkingCountError();
    getSlotsAvailability()
      .then((response) => {
        if (response && response["data"]) {
          this.setState((state, props) => ({
            isLoading: false,
            slotsData: response["data"],
          }));
          return;
          this.setParkingCountError();
        }
      })
      .catch((e) => this.setParkingCountError());
    this.fetchAndSetParkingData();
  }

  renderCategoryChart = () => {
    switch (this.isVehicleCountAvaliable()) {
      case 100:
        return (
          <CategoryChart
            vehicleCountData={{
              ...this.getCategoryParkingCount(),
            }}
          />
        );
      case 400:
        return <h3>Loading ...</h3>;
      default:
        return <h3>Unable to load chart ...</h3>;
    }
  };

  getMostParked = () => {
    const vehicleCountData = this.getCategoryParkingCount();
    if (
      vehicleCountData[vehicleTypes.CAR] === 0 &&
      vehicleCountData[vehicleTypes.BIKE] === 0 &&
      vehicleCountData[vehicleTypes.HEAVY] === 0
    ) {
      return "NA";
    }

    if (
      vehicleCountData[vehicleTypes.CAR] >=
      vehicleCountData[vehicleTypes.BIKE] &&
      vehicleCountData[vehicleTypes.CAR] >= vehicleCountData[vehicleTypes.HEAVY]
    ) {
      return vehicleTypes.CAR;
    } else if (
      vehicleCountData[vehicleTypes.BIKE] >=
      vehicleCountData[vehicleTypes.CAR] &&
      vehicleCountData[vehicleTypes.BIKE] >=
      vehicleCountData[vehicleTypes.HEAVY]
    ) {
      return vehicleTypes.BIKE;
    } else {
      return vehicleTypes.HEAVY;
    }
  };

  render() {
    const { isLoading, hasError, slotsData } = this.state;

    if (!isLoading && hasError && !slotsData) {
      return <Error />;
    } else if (isLoading && !hasError && !slotsData) {
      return (
        <>
          {" "}
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <div
              class="spinner-border text-light d-flex align-items-center justify-content-center"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Sidebar />
        <section className="home-section px-3 px-md-0 ps-md-3">
          <div className="container-fluid m-0 p-0 dashboard">
            <div className="row p-0 m-0">
              <div className="col-lg-9 pb-1">
                <div className="text ms-3 d-flex align-items-center justify-content-between">
                  {capitalizeStr("Dashboard", true)}
                  <MobileNav />
                </div>
                {/* Main Row 1 */}
                <div className="row" style={{ height: "50%" }}>
                  {/* Row 1A */}
                  <div className="col-md-6 col-lg-4">
                    <div className="row d-sm-flex justify-content-around justify-content-md-start">
                      <div
                        className="square col-5 col-lg-5  card mx-md-2 p-3 my-2 my-md-0"
                        style={{ backgroundColor: "#000" }}
                      >
                        <h5 style={{ color: "#fff" }}>Slots Empty</h5>
                        <h1 className="highlight" style={{ color: "#FFCECE" }}>
                          {slotsData["avaliable"]}
                        </h1>
                      </div>

                      <div
                        className=" square col-5 col-lg-5 card mx-md-2 p-3 my-2 my-md-0"
                        style={{ backgroundColor: "#000" }}
                      >
                        <h5 style={{ color: "#fff" }}>Slots Occupied</h5>
                        <h1 className="highlight" style={{ color: "#C9F658" }}>
                          {slotsData["occupied"]}
                        </h1>
                      </div>
                    </div>
                    <div className="row py-3 d-sm-flex justify-content-around justify-content-md-start">
                      <div
                        className=" square col-5 col-lg-5  card mx-md-2 p-3 my-2 my-md-0"
                        style={{ backgroundColor: "#000" }}
                      >
                        <h5 style={{ color: "#fff" }}>Total Slots</h5>
                        <h1 className="highlight" style={{ color: "#FFCECE" }}>
                          {slotsData["total"]}
                        </h1>
                      </div>

                      <div
                        className="square col-5 col-lg-5 card mx-md-2 p-3 my-2 my-md-0"
                        style={{ backgroundColor: "#000" }}
                      >
                        <h5 style={{ color: "#fff" }}>Slots Avaliable?</h5>
                        <h1 className="highlight" style={{ color: "#C9F658" }}>
                          {slotsData["avaliable"] ? "Yes" : "No"}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* Row 1B */}
                  <div className="col-sm-12 col-md-6 col-lg-8 p-0 pe-md-4 pe-lg-5">
                    <div
                      className="col-md-12 col-lg-12 card  p-3 my-2 my-md-0"
                      style={{
                        backgroundColor: "#fff",
                        height: "91%",
                      }}
                    >
                      <h4 style={{ color: "#111" }}>Categories</h4>
                      {this.renderCategoryChart()}
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row my-4 py-md-0 ">
                  {/* Row 2A */}
                  <Categories />
                  {/* Row 2B */}
                  <div className="col-sm-12 col-md-4 col-lg-3 p-0 pe-md-4 pe-lg-5 pt-3 pt-md-0 my-3 my-md-0 ">
                    <div
                      className="col-md-12 col-lg-12 card  p-3  my-md-0 d-flex align-items-center justify-content-between"
                      style={{ backgroundColor: "#FC997C", height: "100%" }}
                    >
                      <h3 style={{ color: "#111" }}>Majority</h3>
                      <h2 className="text-dark mt-4 fw-bold">
                        {this.isVehicleCountAvaliable() === 100 &&
                          this.getVehicleIcon()}{" "}
                        {this.isVehicleCountAvaliable() === 100 &&
                          this.getMostParked()}
                      </h2>
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
  }
}
export default function Dashboard() {
  const navigate = useNavigate();
  return <DashboardState navigate={navigate} />;
}
