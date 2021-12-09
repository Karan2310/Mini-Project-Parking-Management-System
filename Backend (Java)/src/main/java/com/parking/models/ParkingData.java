package com.parking.models;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

public class ParkingData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	
	String id;
	VehicleType vehicalType;
	String vechicleNumber;
	String driverName;
	Date startTime;
	double fare;
	
	

	

	public ParkingData() {
		this.id = UUID.randomUUID().toString();
	}

	public ParkingData(String id, VehicleType vehicalType, String vechicleNumber, String driverName, Date startTime,
			double fare) {
		super();
		this.id = id;
		this.vehicalType = vehicalType;
		this.vechicleNumber = vechicleNumber;
		this.driverName = driverName;
		this.startTime = startTime;
		this.fare = fare;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	

	public VehicleType getVehicalType() {
		return vehicalType;
	}

	public void setVehicalType(VehicleType vehicalType) {
		this.vehicalType = vehicalType;
	}

	public String getVechicleNumber() {
		return vechicleNumber;
	}

	public void setVechicleNumber(String vechicleNumber) {
		this.vechicleNumber = vechicleNumber;
	}

	public String getDriverName() {
		return driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public double getFare() {
		return fare;
	}

	public void setFare(double fare) {
		this.fare = fare;
	}

	@Override
	public String toString() {
		return "ParkingData [id=" + id + ", vehicalType=" + vehicalType + ", vechicleNumber=" + vechicleNumber
				+ ", driverName=" + driverName + ", startTime=" + startTime + ", fare=" + fare + "]";
	}

}
