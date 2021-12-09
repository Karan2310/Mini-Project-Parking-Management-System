package com.parking.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.parking.models.ParkingData;
import com.parking.models.VehicleType;
import com.parking.utility.ParkingDataUtility;

/**
 * Servlet implementation class UpdateParkingData
 */
@WebServlet("/UpdateParkingData")
public class UpdateParkingData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 * 
	 */
	
	 Gson gson = new Gson();
	
	
	public UpdateParkingData() {
		super();
		// TODO Auto-generated constructor stub
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */

	private VehicleType getVehicleTypeEnum(String vehicleTypeString) {

		switch (vehicleTypeString.toLowerCase().trim()) {

		case "car":
			return VehicleType.CAR;

		case "bike":
			return VehicleType.BIKE;

		default:
			return VehicleType.HEAVY;

		}

	}

	@SuppressWarnings("deprecation")
	private Date getStartTime(String startTime) {
				
		try {
			
			long startTimeStamp = Long.parseLong(startTime);
			
			Date startTimeStampDate = new Date(startTimeStamp);
			
			return  startTimeStampDate;


		} catch (Exception e) {

			System.out.println("------ Exception on getStartTime -------------");
			
			e.printStackTrace();
			
			return new Date();
		}  



	}

	private ParkingData buildParkingData(String vehicleType, String vechicleNumber, String driverName,
			String startTime) {

		ParkingData parkingData = new ParkingData();

		parkingData.setVechicleNumber(vechicleNumber);

		parkingData.setDriverName(driverName);

		VehicleType vehicleTypeEnum = getVehicleTypeEnum(vehicleType);

		parkingData.setVehicalType(vehicleTypeEnum);

		parkingData.setStartTime(getStartTime(startTime));

		parkingData.setFare(vehicleTypeEnum.getVehicleFarePerHour());

		return parkingData;

	}
	
	


	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();

		response.setCharacterEncoding("UTF-8");
		/*
		 * { "id": "121", "vehicalType": "CAR", "vechicleNumber": "MH-09-23923",
		 * "driverName": "Driver", "startTime": "Nov 21, 2021, 11:32:52 AM", "fare":
		 * 10.0 }
		 */
		
		System.out.println("Getting enumeration");
		
		BufferedReader br  = request.getReader();
		
		String line ="";
		
		StringBuilder requestBody = new StringBuilder();
		
		while((line = br.readLine()) != null) {
			
			System.out.println("->"+line);
			
			requestBody.append(line);
			
			requestBody.append(System.lineSeparator());
			
		}
		
		System.out.println(requestBody);

		//Enumeration<String> paramNames = request.getParameterNames();
		
		//String jsonRequestString = paramNames.nextElement();
		
		
	
		try {

			HashMap<String, String> requestMap = gson.fromJson(requestBody.toString(), HashMap.class);
			
			System.out.println("---- Request map ------");
	
			System.out.println(requestMap);
			
			System.out.println("Getting params");
			
			System.out.println(requestMap.keySet());
			
			String vehicleType = requestMap.get("vehicalType");

			String vechicleNumber = requestMap.get("vehicleNumber");

			String driverName = requestMap.get("driverName");

			String startTime = requestMap.get("startTime");
			
		

			if ((vehicleType != null && vechicleNumber != null && driverName != null && startTime != null)
					&& (!vehicleType.isEmpty() && !vechicleNumber.isEmpty() && !driverName.isEmpty()
							&& !startTime.isEmpty())) {

				ParkingData newParkingData = buildParkingData(vehicleType, vechicleNumber, driverName, startTime);
				
				System.out.println(newParkingData);
				
				ParkingDataUtility parkingDataUtility =   new ParkingDataUtility();
				
				if(parkingDataUtility.addNewVehicleInParking(newParkingData)) {
					
					out.print(gson.toJson(newParkingData));
					
				} else {
					
					throw new Exception("Parking data already exists");					
					
				}
				

			} else {

				throw new Exception("Input fields missing values");

			}

		} catch (Exception e) {

			System.out.println("------ Exception on UpdateParkingData.class -> doPost -------------");
			
			System.out.println(e);

			out.print("");

		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		try {
			PrintWriter out = response.getWriter();

			response.setContentType("application/json");

			response.setCharacterEncoding("UTF-8");
			
			String vehicleId = request.getParameter("vehicleId");
			
			if (vehicleId != null && !vehicleId.isEmpty()) {
				ParkingDataUtility parkingDataUtility =   new ParkingDataUtility();
				parkingDataUtility.removeVehicleById(vehicleId);
				
			}
			
		} catch (IOException e) {
			
			System.out.println("------ Exception on UpdateParkingData.class -> doDelete  -------------");

			e.printStackTrace();
		}
			
			
			
	}

}
