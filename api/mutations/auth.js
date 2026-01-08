
import axios from "axios";
import { endpoints } from "../endpoints";
import axiosInstance from "../axios";


export const signUpUser = async (data) => {
  const res = await axiosInstance.post(endpoints.auth.signUp, data);
  return {
    accessToken: res.data.accessToken,
    user: res.data.user,
  };
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post(endpoints.auth.login, data);
  return response.data;
};