import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import LoggedInHome from "./LoggedInHome";
import { useAuth } from "../context/useAuth";
import {
	CalculatorIcon,
	NewspaperIcon,
	ReceiptPercentIcon,
} from "@heroicons/react/24/solid";

const HomePage = () => {
	useDocumentTitle("Home");

	const { authUser, authLogout, authUserLoading } = useAuth();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const mode = searchParams.get("mode"); // 'login' o 'register'

	const [isRegister, setIsRegister] = useState(mode === "register");

	useEffect(() => {
		setIsRegister(mode === "register");
	}, [mode]);

	const handleToggleMode = (newMode: string) => {
		navigate(`/?mode=${newMode}`);
	};

	if (authUserLoading) return <p className="p-4">Loading User...</p>;

	return (
		<div className="flex flex-col justify-center items-center p-6 w-screen min-h-screen text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
			{authUser ? (
				<LoggedInHome authUser={authUser} authLogout={authLogout} />
			) : (
				<div className="flex flex-col md:flex-row h-auto md:h-[80vh] w-[80vw]">
					<div className="w-full md:w-1/2 min-h-[70vh] flex items-center justify-center p-4">
						<div className="text-center">
							<h1 className="mb-4 text-6xl font-bold text-amber-50">
								Welcome to <span className="text-orange-500">Inventive</span>
							</h1>
							<p className="text-lg text-neutral-300">
								Manage your inventories with style
							</p>
							<div className="flex justify-center mt-6 space-x-6">
								<NewspaperIcon className="w-10 h-10 text-orange-400" />
								<CalculatorIcon className="w-10 h-10 text-orange-400" />
								<ReceiptPercentIcon className="w-10 h-10 text-orange-400" />
							</div>
						</div>
					</div>

					<div className="w-full md:w-1/2 min-h-[70vh] bg-[url('/recibo.jpg')] bg-cover bg-center relative p-4  ">
						<div className="absolute inset-0"></div>

						<div className="flex absolute inset-0 justify-center items-center ">
							<div className="rounded-lg w-90">
								{isRegister ? <RegisterPage /> : <LoginPage />}

								{isRegister ? (
									<p className="mt-4 font-bold text-center text-black text-m mb-4">
										Already have an account?
										<button
											type="button"
											onClick={() => handleToggleMode("login")}
											className="ml-1 text-orange-400 underline"
										>
											Login
										</button>
									</p>
								) : (
									<p className="mt-4 font-bold text-center text-m text-black">
										Don't have an account?
										<button
											type="button"
											onClick={() => handleToggleMode("register")}
											className="ml-1 text-orange-400 underline"
										>
											Register
										</button>
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
