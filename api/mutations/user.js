import axiosInstance from "../axios";
import { endpoints } from "../endpoints";

export const PostTask = async (payload) => {
    try {
        const response = await axiosInstance.post(endpoints.task.post, payload);
        return response;
    } catch (error) {
        console.log('error post task', error);
        return error;
    }
}

export const UpdateTaskStatus = async (id, payload) => {
    try {
        const response = await axiosInstance.put(endpoints.task.updateTaskStatus(id), payload);
        return response;
    } catch (error) {
        console.log('error update task', error);
        throw error;
    }
}

export const DeleteTaskById = async (id) => {
    try {
        const response = await axiosInstance.delete(endpoints.task.deleteTaskById(id));
        return response;
    } catch (error) {
        console.log('error update task', error);
        throw error;
    }
}

export const UpdateUser = async (id, payload) => {
    try {
        const response = await axiosInstance.put(endpoints.user.update(id), payload);
        return response.data;
    } catch (error) {
        console.error("error update user", error);
        throw error;
    }
}