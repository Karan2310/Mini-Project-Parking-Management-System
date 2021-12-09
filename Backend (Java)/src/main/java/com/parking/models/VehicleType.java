package com.parking.models;

public enum VehicleType {

	CAR(40), BIKE(20), HEAVY(70);
	
	private final double vehicleFarePerHour;

	VehicleType(double i) {
		this.vehicleFarePerHour = i;
	}

	public double getVehicleFarePerHour() {
		return vehicleFarePerHour;
	}
	
}
