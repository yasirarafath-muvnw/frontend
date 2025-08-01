
import axiosInstance from "../axios";
import { endpoints } from "../endpoints";


export const signUpUser = async (data) => {
  const response = await axiosInstance.post(endpoints.auth.signUp, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post(endpoints.auth.login, data);
  return response.data;
};