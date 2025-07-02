import { User } from "../Types/User";
export interface IAuthRepository {
	login(email: string, password: string): Promise<string>;
	register(
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<void>;
	logout(): void;
}
