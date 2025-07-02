import { createContext, useContext, useEffect, useState } from "react";
import { AuthRepository } from "../../Infrastructure/Repositories/AuthRepository";
import { loginUseCase } from "../../Application/Usecases/auth/loginUseCase";
import { registerUseCase } from "../../Application/Usecases/auth/registerUseCase";
interface AuthContextType {
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	register: (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	) => Promise<void>;
	logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authRepo = new AuthRepository();
const loginUC = loginUseCase(authRepo);
const registerUc = registerUseCase(authRepo);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem("token") || ""
	);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setToken(token);
		}
	}, []);

	const login = async (email: string, password: string) => {
		const token = await loginUC(email, password);
		console.log("token" + token);
		setToken(token);
	};
	const register = async (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	) => {
		console.log("inside auth ");
		await registerUc(name, email, password, confirmPassword);
	};
	const logout = () => {
		authRepo.logout();
		console.log("logged out");
		setToken("");
	};

	return (
		<AuthContext.Provider value={{ token, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
