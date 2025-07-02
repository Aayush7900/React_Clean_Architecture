import Login from "./Interface/Pages//User/Login";
import { AuthProvider } from "./Interface/Contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Interface/Components/Home";
import ShowAllProducts from "./Interface/Pages/Product/ShowAllProducts";
import Add from "./Interface/Pages/Product/AddProduct";
import Delete from "./Interface/Pages/Product/DeleteProduct";
import UpdateProduct from "./Interface/Pages/Product/UpdateProduct";
import AddCategory from "./Interface/Pages/ProductCategory/AddProductCategory";
import ShowAllProductCategories from "./Interface/Pages/ProductCategory/ShowAllProductCategories";
import DeleteCategory from "./Interface/Pages/ProductCategory/DeleteProductCategory";
import ProtectedRoute from "./Interface/Components/ProtectedRoute";
import Register from "./Interface/Pages/User/Register";
function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/Home" element={<Home />}>
							<Route
								path="product/all"
								element={<ShowAllProducts />}
							/>
							<Route path="product/create" element={<Add />} />
							<Route path="product/delete" element={<Delete />} />
							<Route
								path="product/update"
								element={<UpdateProduct />}
							/>
							<Route
								path="productcategory/all"
								element={<ShowAllProductCategories />}
							/>
							<Route
								path="productcategory/create"
								element={<AddCategory />}
							/>
							<Route
								path="productcategory/delete"
								element={<DeleteCategory />}
							/>
						</Route>
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
