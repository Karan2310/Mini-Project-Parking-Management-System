package com.parking.utility;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

import com.parking.models.ParkingData;

public class DataLoaderWriterUtility {

	File dataFile;

	boolean dataFileExists = false;
	
	final String dataFilePath = "C:/Users/karan/Desktop/Parking-Management-System/parking_details.txt";

	public DataLoaderWriterUtility() {

		try {

			this.dataFile = new File(dataFilePath);

			this.dataFile.createNewFile();

			this.dataFileExists = true;

		} catch (Exception e) {

			System.out.println("------ Exception in creating parking_details.txt -----------");

			e.printStackTrace();

		}

	}

	@SuppressWarnings("unchecked")
	public ArrayList<ParkingData> loadParkingData() {

		try {

			if (this.dataFileExists) {

				ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(this.dataFile));

				Object loadedList = inputStream.readObject();

				inputStream.close();

				if (loadedList != null)

					return (ArrayList<ParkingData>) loadedList;

				else

					throw new Exception("No data in loaded parking data list");

			} else {

				throw new Exception("parking_details.txt not found");

			}
		} catch (Exception e) {

			return new ArrayList<ParkingData>();
		}

	}

	@SuppressWarnings("unchecked")
	public void writeParkingData(ArrayList<ParkingData> parkingDataToWrite) throws Exception {

		if (this.dataFileExists) {

			ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(this.dataFile));

			outputStream.writeObject(parkingDataToWrite);

			outputStream.close();
			
		}

	}

}
