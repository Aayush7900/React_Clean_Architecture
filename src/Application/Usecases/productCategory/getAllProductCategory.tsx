import { IProductCategoryRepository } from "../../../Domain/Repositories/IProductCategoryRepository";
export function getAllProductCategories(repo: IProductCategoryRepository) {
	return async () => {
		return await repo.getAll();
	};
}
