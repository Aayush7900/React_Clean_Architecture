import { useEffect, useState } from "react";
function CategoryDropdown({ onSelect }) {
	const [categories, setCategories] = useState([]);
	const [selectedId, setSelectedId] = useState("");
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					"https://localhost:7008/api/ProductCategory/all",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				const selectivedata = data.map(({ id, name }) => ({
					id,
					name,
				}));
				setCategories(selectivedata);
			} catch (error) {
				console.error(error);
			}
		};
		fetchCategories();
	}, []);
	const handleChange = (e) => {
		const value = e.target.value;
		setSelectedId(value);
		onSelect?.(value);
	};
	return (
		<div className="mb-6">
			<label className="block text-gray-700 font-medium mb-2">
				Select Category
			</label>
			<select
				value={selectedId}
				onChange={handleChange}
				className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			>
				<option value="">--Choose Category --</option>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
}
export default CategoryDropdown;
