import axiosInstance from "../Services/axiosInstance";
import { IProductCategoryRepository } from "../../Domain/Repositories/IProductCategoryRepository";
import { ProductCategory } from "../../Domain/Types/ProductCategory";
import { ProductCategoryResponse } from "../../Domain/Types/ProductCategoryResponse";
export class ProductCategoryRepository implements IProductCategoryRepository {
	async getAll(): Promise<ProductCategoryResponse[]> {
		const res = await axiosInstance.get("/ProductCategory/all");
		return res.data;
	}
	async create(product: Omit<ProductCategory, "id">): Promise<void> {
		const formData = new FormData();
		formData.append("Name", product.name);
		console.log("inside category");
		if (product.image) {
			console.log("Image added");
			formData.append("ImagePath", product.image);
		}
		await axiosInstance.post("ProductCategory/add", formData);
	}
	async update(product: ProductCategory): Promise<void> {
		await axiosInstance.put(`ProductCategory/${product.id}`, product);
	}
	async delete(id: number): Promise<void> {
		await axiosInstance.delete(`ProductCategory/delete/${id}`);
	}
}
