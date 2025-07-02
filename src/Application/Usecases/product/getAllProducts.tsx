import { IProductRepository } from "../../../Domain/Repositories/IProductRepository";
export function getAllProducts(repo: IProductRepository) {
	return async () => {
		return await repo.getAll();
	};
}
