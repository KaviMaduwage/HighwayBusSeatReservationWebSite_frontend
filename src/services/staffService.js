import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const populateBusCrewTypes = () => axios.get(API_BASE_URL+"/loadBusCrewTypes");
export const saveStaffMember = (busCrew) => axios.post(API_BASE_URL+"/saveBusCrew", busCrew);

export const populateStaffDetails = (user) => axios.post(API_BASE_URL+"/loadAllBusCrewDetailsByBusOwnerUserId", user);
export const findMemberById = (memberId) => axios.post(API_BASE_URL+"/findMemberById", { memberId: memberId });

export const deleteMemberById = (memberId, crewTypeId) => axios.post(API_BASE_URL+"/deleteMemberById", { memberId: memberId, crewTypeId:crewTypeId });

export const searchStaff = (name,jobType, status,userId) => axios.post(API_BASE_URL+"/searchMember",{name : name, jobType : jobType, status:status, userId:userId})