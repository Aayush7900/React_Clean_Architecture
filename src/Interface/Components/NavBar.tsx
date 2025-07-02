import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
export default function Navbar() {
	const { logout } = useAuth();
	return (
		<nav className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0 font-bold text-xl">
						<Link to="/">MyApp</Link>
					</div>

					{/* Menu */}
					<div className="flex space-x-6 items-center">
						{/* Dropdown Container */}
						<div className="relative group">
							<button
								type="button"
								className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
								aria-haspopup="true"
							>
								Products
								<svg
									className="ml-1 h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{/* Dropdown Menu (hidden by default, shows on hover) */}
							<div className="absolute left-0 w-40 rounded-md shadow-lg bg-white text-black ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200">
								<div className="py-1">
									<Link
										to="/home/product/all"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										View Products
									</Link>
									<Link
										to="/home/product/create"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Create Product
									</Link>
									<Link
										to="/home/product/delete"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Delete Product
									</Link>
								</div>
							</div>
						</div>
						<div className="relative group">
							<button
								type="button"
								className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
								aria-haspopup="true"
							>
								Product Category
								<svg
									className="ml-1 h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							<div className="absolute left-0 w-40 rounded-md shadow-lg bg-white text-black ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200">
								<div className="py-1">
									<Link
										to="/home/productcategory/all"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										View Product Categories
									</Link>
									<Link
										to="/home/productcategory/create"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Create Product Category
									</Link>
									<Link
										to="/home/productcategory/delete"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Delete Product Category
									</Link>
								</div>
							</div>
						</div>

						<Link
							to="/login"
							className="bg-red-800 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium"
							onClick={logout}
						>
							Logout
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
