import axiosInstance from "../Services/axiosInstance";
import { IProductRepository } from "../../Domain/Repositories/IProductRepository";
import { Product } from "../../Domain/Types/Product";
import { ProductResponse } from "../../Domain/Types/ProductResponse";
export class ProductRepository implements IProductRepository {
	async getAll(): Promise<ProductResponse[]> {
		const res = await axiosInstance.get("/Product/all");
		return res.data;
	}
	async create(product: Omit<Product, "id">): Promise<void> {
		const formData = new FormData();
		formData.append("Name", product.name);
		formData.append("Price", product.price.toString());
		formData.append(
			"ProductCategoryId",
			product.productCategoryId.toString()
		);
		if (product.image) {
			console.log("Image added");
			formData.append("Image", product.image);
		} else {
			formData.append("Image", "null");
		}
		await axiosInstance.post("Product/add", formData);
	}
	async update(product: Product): Promise<void> {
		await axiosInstance.put(`Product/${product.id}`, product);
	}
	async delete(id: number): Promise<void> {
		await axiosInstance.delete(`Product/delete/${id}`);
	}
}
