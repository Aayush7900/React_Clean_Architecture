import { IProductCategoryRepository } from "../../../Domain/Repositories/IProductCategoryRepository";
import { ProductCategory } from "../../../Domain/Types/ProductCategory";

export function createProductCategory(repo: IProductCategoryRepository) {
	return async (productCategory: Omit<ProductCategory, "id">) => {
		await repo.create(productCategory);
	};
}
