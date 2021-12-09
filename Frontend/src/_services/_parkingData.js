import axios from 'axios';

const BASE_URL = 'http://localhost:8080/ParkingManagement';

const GET_REQUEST_SUB_PATH = 'GetParkingData';

const POST_REQUEST_SUB_PATH = 'UpdateParkingData';

const GET_REQUEST_URL = `${BASE_URL}/${GET_REQUEST_SUB_PATH}`;

const UPDATE_PARKING_DATA_URL = `${BASE_URL}/${POST_REQUEST_SUB_PATH}`;

export async function getAllParkingData() {
    try {
        const allParkingData = await axios.get(GET_REQUEST_URL);
        return allParkingData;
    } catch (error) {
        throw error;
    }
}


export async function getSlotsAvailability() {
    try {
        const slotsAvailability = { slotsAvaliability: true };
        const allParkingData = await axios.get(GET_REQUEST_URL, { params: slotsAvailability });
        return allParkingData;
    } catch (error) {
        throw error;
    }
}


export async function getVehicleParked(vehicleType) {
    try {
        const neededVehicleType = { vehicleType };
        const allParkingData = await axios.get(GET_REQUEST_URL, { params: neededVehicleType });
        return allParkingData;
    } catch (error) {
        throw error;
    }
}


export async function updateParkingData(newParkingData) {
    try {
        const response = await axios.post(UPDATE_PARKING_DATA_URL, newParkingData, { headers: { 'Content-Type': "application/json" } });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteParkingData(vehicleId) {
    try {
        const response = await axios.delete(UPDATE_PARKING_DATA_URL, { params: { vehicleId } });
        return response;
    } catch (error) {
        throw error;
    }
}