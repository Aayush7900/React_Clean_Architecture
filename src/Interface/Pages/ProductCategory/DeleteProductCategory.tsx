import React, { useState, useEffect } from "react";
import { ProductCategoryResponse } from "../../../Domain/Types/ProductCategoryResponse";
import { ProductCategoryRepository } from "../../../Infrastructure/Repositories/ProductCategoryRepository";
import { deleteProductCategory } from "../../../Application/Usecases/productCategory/deleteProductCategory";
import { getAllProductCategories } from "../../../Application/Usecases/productCategory/getAllProductCategory";
const repo = new ProductCategoryRepository();
const getAll = getAllProductCategories(repo);
const deleteCategory = deleteProductCategory(repo);
const itemsPerPage = 10;
function DeleteCategory() {
	const [products, setProducts] = useState<ProductCategoryResponse[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setError(null);
			try {
				const data = await getAll();
				setProducts(data);
			} catch (error) {
				setError("Failed to load products");
			}
		};
		fetchProducts();
	}, []);
	const handleDelete = async (id: number) => {
		const confirm = window.confirm("Confirm Deletion");
		if (!confirm) return;

		try {
			await deleteCategory(id);
			setProducts((prev) => prev.filter((product) => product.id !== id));
		} catch (error) {
			alert("Error deleting product");
		}
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(products.length / itemsPerPage);

	return (
		<div className="max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-6 text-center">
				Product List
			</h2>
			<table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
				<thead className="bg-gray-700 text-white">
					<tr>
						<th className="py-3 px-6 text-left">ID</th>
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-left">Image</th>
						<th className="py-3 px-6 text-left">Action</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((product) => (
						<tr
							key={product.id}
							className="even:bg-gray-100 odd:bg-white"
						>
							<td className="py-2 px-6 border-t border-gray-300">
								{product.id}
							</td>
							<td className="py-2 px-6 border-t border-gray-300">
								{product.name}
							</td>

							<td className="w-80 py-2 px-6 border-t border-gray-300">
								<img
									src={`https://localhost:7008/${product.imagePath}`}
									alt={product.name}
								/>
							</td>
							<td className="py-2 px-6 border-t border-gray-300">
								<button
									onClick={() => handleDelete(product.id!)}
									className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<nav className="mt-6 flex justify-center">
				<ul className="inline-flex -space-x-px">
					{Array.from({ length: totalPages }, (_, index) => (
						<li key={index}>
							<button
								className={`py-2 px-4 border border-gray-300 hover:bg-gray-200 focus:outline-none ${
									currentPage === index + 1
										? "bg-blue-600 text-white border-blue-600"
										: "bg-white text-gray-700"
								} rounded-l-md first:rounded-l-md last:rounded-r-md`}
								onClick={() => setCurrentPage(index + 1)}
							>
								{index + 1}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

export default DeleteCategory;
