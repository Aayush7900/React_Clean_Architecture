import { IProductRepository } from "../../../Domain/Repositories/IProductRepository";
export function deleteProduct(repo: IProductRepository) {
	return async (id: number) => {
		await repo.delete(id);
	};
}
