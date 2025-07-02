import { IProductCategoryRepository } from "../../../Domain/Repositories/IProductCategoryRepository";
export function deleteProductCategory(repo: IProductCategoryRepository) {
	return async (id: number) => {
		console.log("inside detele");
		await repo.delete(id);
	};
}
