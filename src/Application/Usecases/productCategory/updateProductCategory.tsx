import { IProductCategoryRepository } from "../../../Domain/Repositories/IProductCategoryRepository";
import { ProductCategory } from "../../../Domain/Types/ProductCategory";

export function updateProductCategory(repo: IProductCategoryRepository) {
	return async (productCategory: ProductCategory) => {
		await repo.update(productCategory);
	};
}
