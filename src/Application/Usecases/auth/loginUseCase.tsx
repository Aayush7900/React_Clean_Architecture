import { IAuthRepository } from "../../../Domain/Repositories/IAuthRepository";
export function loginUseCase(authRepo: IAuthRepository) {
	return async (email: string, password: string) => {
		return await authRepo.login(email, password);
	};
}
