import { IAuthRepository } from "../../../Domain/Repositories/IAuthRepository";
export function registerUseCase(authRepo: IAuthRepository) {
	return async (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	) => {
		return await authRepo.register(name, email, password, confirmPassword);
	};
}
