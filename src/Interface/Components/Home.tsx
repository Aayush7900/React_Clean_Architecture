import Navbar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
export default function () {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
