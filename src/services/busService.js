import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveBus = (bus, userId) => axios.post(API_BASE_URL+"/saveBusDetails", {busDetail : bus, userId : userId});

export const loadAllBusDetails = () => axios.post(API_BASE_URL+"/loadBusDetails");

export const findBusById = (busId) => axios.post(API_BASE_URL+"/findBusById",{busId: busId});

export const saveSeatStructure = (selectedSeats, busId) => axios.post(API_BASE_URL+"/saveSeatStructure",{seatStructure: selectedSeats, busId: busId});

export const findSeatStructureByBusId = (busId) => axios.post(API_BASE_URL+"/findSeatStructureByBusId", {busId:busId});

export const loadAllBusDetailsInTravelService = (userId) => axios.post(API_BASE_URL+"/loadAllBusDetailsInTravelService",{userId:userId});

export const loadDriversInTravelService = (userId) => axios.post(API_BASE_URL+"/loadDriversInTravelService",{userId:userId});

export const loadConductorsInTravelService = (userId) => axios.post(API_BASE_URL+"/loadConductorsInTravelService",{userId:userId});

export const getAllTravelServiceList = () => axios.post(API_BASE_URL+"/getAllTravelServiceList");