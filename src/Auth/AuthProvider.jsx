import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
                setUser({ email, role });
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
            const { role } = response.data;

            setUser({ email, role });
            // const decodedToken = jwt.decode(token);
            // const userId = decodedToken.userId;
            // setUser(userId);
            // console.log(role, token);
            return response.data;
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    useEffect(() => {
        // Check if the user is already authenticated in localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            // Decode the token to retrieve user information
            const decodedToken = jwt_decode(storedToken);
            const { email, role } = decodedToken;

            // Set the user state with the retrieved information
            setUser({ email, role });
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const authInfo = {
        user,
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
