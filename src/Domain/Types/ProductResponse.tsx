export interface ProductResponse {
	id?: number;
	name: string;
	price: number;
	productCategoryId: number;
	imagePath?: string | null;
}
