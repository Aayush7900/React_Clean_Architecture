import { IProductRepository } from "../../../Domain/Repositories/IProductRepository";
import { Product } from "../../../Domain/Types/Product";
export function updateProduct(repo: IProductRepository) {
	return async (product: Product) => {
		await repo.update(product);
	};
}
