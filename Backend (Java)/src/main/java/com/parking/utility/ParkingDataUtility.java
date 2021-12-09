package com.parking.utility;

import java.util.*;
import java.util.stream.Collectors;

import com.parking.models.ParkingData;
import com.parking.models.VehicleType;

public class ParkingDataUtility {

	ArrayList<ParkingData> parkingDataList;

	final Date currentDate = new Date();

	final DataLoaderWriterUtility loaderWriterUtility = new DataLoaderWriterUtility();

	final int TOTAL_AVALIABLE_SLOTS = 100;

	public ParkingDataUtility() {
		// Need to load arrayList from file

		loadParkingDataFromFile();

	}

	private void loadParkingDataFromFile() {

		this.parkingDataList = loaderWriterUtility.loadParkingData();

		System.out.println("\n======= Refreshed stored data ========\n");

	}

	private double getFarePerHourForVehicleType(ParkingData currentParkingData) {

		return currentParkingData.getVehicalType().getVehicleFarePerHour();

	}

	private void updateParkingdataListFile() {

		try {

			loaderWriterUtility.writeParkingData(parkingDataList);

			loadParkingDataFromFile();

		} catch (Exception e) {

			System.out.println("-------- Exception in updateParkingdataListFile() -------- ");

			e.printStackTrace();

		}

	}

	private void setVehicleFare(ParkingData currentParkingData) {

		double hoursDiff = ((this.currentDate.getTime() - currentParkingData.getStartTime().getTime()) / 1000) / 3600;

		System.out.println(hoursDiff);

		if (Math.abs(hoursDiff) > 1)

			currentParkingData.setFare(hoursDiff * getFarePerHourForVehicleType(currentParkingData));

		else

			currentParkingData.setFare(getFarePerHourForVehicleType(currentParkingData));

	}

	public ArrayList<ParkingData> getAllParkedVehicles() {

		return (ArrayList<ParkingData>) this.parkingDataList.stream().map(eachParkingData -> {

			ParkingData currentParkingData = eachParkingData;

			setVehicleFare(currentParkingData);

			return currentParkingData;

		}).collect(Collectors.toList());

	}

	public boolean addNewVehicleInParking(ParkingData newParkingData) {

		if (newParkingData != null && this.getAllParkedVehicles().size() + 1 <= TOTAL_AVALIABLE_SLOTS) {

			if (getVehicleById(newParkingData.getId()) == null
					&& getVehicleByNamePlate(newParkingData.getVechicleNumber()) == null) {

				this.parkingDataList.add(newParkingData);

				updateParkingdataListFile();

				loadParkingDataFromFile();

				return true;

			}

		}

		return false;

	}

	public void removeVehicleById(String vehicleId) {

		try {

			int parkingDataInilialSize = parkingDataList.size();

			this.parkingDataList = (ArrayList<ParkingData>) this.parkingDataList.stream().filter(eachParkingData ->

			!eachParkingData.getId().equals(vehicleId)

			).collect(Collectors.toList());

			if (this.parkingDataList.size() < parkingDataInilialSize) {

				updateParkingdataListFile();

				loadParkingDataFromFile();
			}

		} catch (Exception e) {

			System.out.println("-------------Exception while removing vehicle------------------");

			e.printStackTrace();
		}

	}

	public ParkingData getVehicleById(String vehicleId) {

		try {

			Iterator<ParkingData> itr = this.parkingDataList.iterator();

			while (itr.hasNext()) {

				ParkingData currentParkingData = (ParkingData) itr.next();

				if (vehicleId != null && currentParkingData.getId().equals(vehicleId)) {

					setVehicleFare(currentParkingData);

					return currentParkingData;

				}

			}

			return null;

		} catch (Exception e) {
			System.out.println("-------------Exception getting vehicle by id------------------");
			e.printStackTrace();
		}
		return null;

	}

	public ParkingData getVehicleByNamePlate(String namePlateId) {

		try {

			Iterator<ParkingData> itr = this.parkingDataList.iterator();

			while (itr.hasNext()) {

				ParkingData currentParkingData = (ParkingData) itr.next();

				if (namePlateId != null && currentParkingData.getVechicleNumber().equals(namePlateId)) {

					setVehicleFare(currentParkingData);

					return currentParkingData;

				}

			}

			return null;

		} catch (Exception e) {
			System.out.println("-------------Exception getting vehicle by number------------------");
			e.printStackTrace();
		}
		return null;

	}

	public Map<String, Object> getVehicleByCategory(VehicleType vehicleType) {

		try {

			Map<String, Object> categoryDetails = new HashMap<String, Object>();

			List<ParkingData> categoryVehicles = (ArrayList<ParkingData>) this.parkingDataList.stream()
					.filter(eachParkingData ->

					{
						if (eachParkingData.getVehicalType().equals(vehicleType)) {

							setVehicleFare(eachParkingData);

							return true;

						}
						return false;
					}

					).collect(Collectors.toList());

			categoryDetails.put("parked_count", categoryVehicles.size());

			categoryDetails.put("vehicles_parked", categoryVehicles);

			return categoryDetails;

		} catch (Exception e) {
			System.out.println("-------------Exception getting getVehicleByCategory------------------");
			e.printStackTrace();
		}
		return null;

	}

	public Map<String, Integer> getParkingSlotsCount() {

		Map<String, Integer> slotsInfoMap = new HashMap<String, Integer>();

		int actualSlotsOccupied = this.getAllParkedVehicles().size();

		slotsInfoMap.put("avaliable",
				(TOTAL_AVALIABLE_SLOTS - actualSlotsOccupied) <= 0 ? 0 : (TOTAL_AVALIABLE_SLOTS - actualSlotsOccupied));

		slotsInfoMap.put("occupied", actualSlotsOccupied);

		slotsInfoMap.put("total", TOTAL_AVALIABLE_SLOTS);

		return slotsInfoMap;

	}

}
