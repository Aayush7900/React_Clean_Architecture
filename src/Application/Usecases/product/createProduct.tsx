import { IProductRepository } from "../../../Domain/Repositories/IProductRepository";
import { Product } from "../../../Domain/Types/Product";

export function createProduct(repo: IProductRepository) {
	return async (product: Omit<Product, "id">) => {
		await repo.create(product);
	};
}
