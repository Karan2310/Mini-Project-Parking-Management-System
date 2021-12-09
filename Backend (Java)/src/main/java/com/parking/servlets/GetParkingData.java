package com.parking.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.parking.models.VehicleType;
import com.parking.utility.ParkingDataUtility;

/**
 * Servlet implementation class GetParkingData
 */
@WebServlet("/GetParkingData")
public class GetParkingData extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private final Gson gson = new Gson();

	public GetParkingData() {
		super();
	}

	private VehicleType getVehicleTypeSelected(String vehicleType) {

		switch (vehicleType.toUpperCase()) {
		case "CAR":
			return VehicleType.CAR;
		case "BIKE":
			return VehicleType.BIKE;
		default:
			return VehicleType.HEAVY;
		}

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();

		response.setContentType("application/json");

		response.setCharacterEncoding("UTF-8");

		String vehicleId = request.getParameter("vehicleId");

		String numberPlate = request.getParameter("numberPlate");

		String vehicleType = request.getParameter("vehicleType");

		String slotsAvaliability = request.getParameter("slotsAvaliability");

		String resultString = "";

		ParkingDataUtility parkingDataUtility = new ParkingDataUtility();

		if (vehicleId != null && !vehicleId.isEmpty())

			resultString = gson.toJson(parkingDataUtility.getVehicleById(vehicleId));

		else {

			if (numberPlate != null && !numberPlate.isEmpty())

				resultString = gson.toJson(parkingDataUtility.getVehicleByNamePlate(numberPlate));

			else if (vehicleType != null && !vehicleType.isEmpty()) {

				VehicleType vehicleTypeSelected = getVehicleTypeSelected(vehicleType);

				resultString = gson.toJson(parkingDataUtility.getVehicleByCategory(vehicleTypeSelected));

			}

			else if (slotsAvaliability != null && !slotsAvaliability.isEmpty()) 

				resultString = gson.toJson(parkingDataUtility.getParkingSlotsCount());

			else

				resultString = gson.toJson(parkingDataUtility.getAllParkedVehicles());
		}

		out.print(resultString);

	}

}
