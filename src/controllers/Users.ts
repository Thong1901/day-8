import axiosClient from "../api/apiUsers";
import Cookies from "js-cookie";

export interface Users {
    UserID?: number; // để optional vì khi tạo mới chưa có
    FullName: string;
    Role?: string;
    Email: string;
    Instagram?: string;
    Twitter?: string;
    AvatarURL?: string;
}

//viết hàm get và post
export const getUsers = async () => {
    try {
        const response = await axiosClient.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (userData: Users) => {
    try {
        const response = await axiosClient.post("/users", userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
export const getUserById = async (id: number) => {
    try {
        const response = await axiosClient.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};
export const RegisterUser = async (registerData: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
        const response = await axiosClient.post("/users/password", registerData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
export const LoginUser = async (loginData: { email: string; password: string }) => {
    try {
        const response = await axiosClient.post("/users/login", loginData);

        if (response.data.token) {
            Cookies.set("token", response.data.token, { path: "/", expires: 1 })
        }

        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};
