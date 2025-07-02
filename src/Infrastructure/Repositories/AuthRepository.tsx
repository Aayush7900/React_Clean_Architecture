import axios from "axios";
import { IAuthRepository } from "../../Domain/Repositories/IAuthRepository";

export class AuthRepository implements IAuthRepository {
	async login(email: string, password: string): Promise<string> {
		const res = await axios.post("https://localhost:7008/api/User/login", {
			email,
			password,
		});
		const data = res.data;
		localStorage.setItem("token", data.token);
		return data.token;
	}
	async register(
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<void> {
		console.log({ name, email, password, confirmPassword });
		await axios.post("https://localhost:7008/api/User/register", {
			Name: name,
			Email: email,
			Password: password,
			ConfirmPassword: confirmPassword,
		});
	}
	logout(): void {
		localStorage.removeItem("token");
	}
}
