import React, { useState, useRef } from "react";
import { ProductCategoryRepository } from "../../../Infrastructure/Repositories/ProductCategoryRepository";
import { createProductCategory } from "../../../Application/Usecases/productCategory/createProductCategory";
import { ProductCategory } from "../../../Domain/Types/ProductCategory";

const repo = new ProductCategoryRepository();
const add = createProductCategory(repo);

function AddCategory() {
	const [name, setName] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setImage(file);
		setPreview(URL.createObjectURL(file));
	};
	const handleImageClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};
	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault();
		const product: ProductCategory = {
			name: name,
			image: image,
		};

		try {
			await add(product);
			alert("Product added successfully");
			setName("");
			setPreview(null);
			setImage(null);
		} catch (error) {
			alert("Error adding product" + error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
			<form onSubmit={handleAdd}>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2">
						Name
					</label>
					<input
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<label className="block text-gray-700 font-medium mb-2">
					Image
				</label>
				<input
					type="file"
					accept="image/*"
					ref={inputRef}
					onChange={handleChange}
					className="hidden"
				/>
				{!preview ? (
					<input
						type="file"
						accept="image/*"
						className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={handleChange}
						required
					/>
				) : (
					<img
						src={preview}
						alt="Preview"
						className="mb-4 rounded hover:opacity-80 cursor-pointer"
						onClick={handleImageClick}
					/>
				)}
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
				>
					Add Product
				</button>
			</form>
		</div>
	);
}
export default AddCategory;
