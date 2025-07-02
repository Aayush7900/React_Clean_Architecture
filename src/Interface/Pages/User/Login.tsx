import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";

export default function Login() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			email: "user@example.com",
			password: "string",
		},
	});
	const { login } = useAuth();
	const navigate = useNavigate();
	const onSubmit = async ({ email, password }) => {
		try {
			login(email, password);
			navigate("/home");
		} catch (error) {
			setError("root", {
				type: "server",
				message: "Server is unreachable.",
			});
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
				<div className="mb-6">
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
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
				>
					{isSubmitting ? "Loading..." : "Submit"}
				</button>
				{errors.root && (
					<p className="text-red-500 text-sm">
						{errors.root.message}
					</p>
				)}{" "}
			</form>
		</div>
	);
}
