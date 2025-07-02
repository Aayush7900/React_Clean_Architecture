import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Contexts/AuthContext";
import { RegisterFormInput } from "../../../Domain/Types/RegisterFormInput";
function Register() {
	const navigate = useNavigate();
	const { register: registerUser } = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormInput>({});
	const onSubmit = async ({ name, email, password, confirmPassword }) => {
		if (password !== confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "passwords do not match",
			});
			return;
		}
		try {
			registerUser(name, email, password, confirmPassword);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">
					Register
				</h2>
				<div className="mb-4">
					<input
						{...register("name", {})}
						type="text"
						placeholder="Name"
						className="w-full px-4 py-2 border rounded-lg"
					/>
				</div>
				<div className="mb-4">
					<input
						{...register("email", {
							required: "Email is required",
							validate: (value) => {
								if (!value.includes("@")) {
									return "Email must include @";
								}
								return true;
							},
						})}
						type="text"
						placeholder="Email"
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.email && (
						<div className="px-4 text-red-500 ">
							{errors.email.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<input
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Must have 6 characters",
							},
						})}
						type="password"
						placeholder="Password"
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.password && (
						<div className="px-4 text-red-500">
							{errors.password.message}
						</div>
					)}
				</div>
				<div className="mb-6">
					<input
						{...register("confirmPassword", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Must have 6 characters",
							},
						})}
						type="password"
						placeholder="ConfirmPassword"
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.confirmPassword && (
						<div className="px-4 text-red-500">
							{errors.confirmPassword.message}
						</div>
					)}
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
				>
					{isSubmitting ? "Loading..." : "Submit"}
				</button>
			</form>
		</div>
	);
}

export default Register;
