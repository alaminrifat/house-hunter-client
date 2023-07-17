import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const username = "Rifat";

    const registerUser = async (fullName, email, password, role) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/register",
                {
                    fullName,
                    email,
                    password,
                    role,
                }
            );

            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error("User registration failed");
            }
        } catch (error) {
            throw new Error(error.response.data.error); // Throw backend error message
        }
    };
    // user login
    const loginUser = async (email, password) => {
        try {
            // Make a POST request to the login endpoint
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {
                    email,
                    password,
                }
            );
            const { token } = response.data;
            localStorage.setItem("token", token);

            // const decodedToken = jwt.decode(token);
            // const userId = decodedToken.userId;
            // setUser(userId);

            return response.data;
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const authInfo = {
        setUser,
        registerUser,
        loginUser,
        username,
    };
    // console.log('auth provider');

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
