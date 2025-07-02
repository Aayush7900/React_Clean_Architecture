export interface Product {
	id?: number;
	name: string;
	price: number;
	productCategoryId: number;
	image: File | null;
}
