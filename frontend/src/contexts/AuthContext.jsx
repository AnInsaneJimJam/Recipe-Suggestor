import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("token") || null);

	const checkAuth = useCallback(async () => {
		if (token) {
			try {
				const response = await fetch("/api/auth/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.ok) {
					const userData = await response.json();
					setUser(userData.data);
				} else {
					logout();
				}
			} catch (error) {
				console.error("Invalid", error.message);
				logout();
			}
		}
	}, [token]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	const login = async (credentials) => {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials),
		});
		const data = await response.json();
		if (response.ok) {
			localStorage.setItem("token", data.data.token);
			setToken(data.data.token);
			setUser(data.data);
		}
		return data;
	};

	const register = async (userData) => {
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		if (response.ok) {
			localStorage.setItem("token", data.data.token);
			setToken(data.data.token);
			setUser(data.data);
		}
		return data;
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
	};

	const value = { user, token, login, register, logout };

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
