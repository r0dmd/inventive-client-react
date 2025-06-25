import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import LoggedInHome from "./LoggedInHome";
import {
	CalculatorIcon,
	NewspaperIcon,
	ReceiptPercentIcon,
} from "@heroicons/react/24/solid";

const HomePage = () => {
	useDocumentTitle("Home");

	const { authUser, authLogout, authUserLoading } = useContext(AuthContext);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const mode = searchParams.get("mode"); // 'login' o 'register'

	const [isRegister, setIsRegister] = useState(mode === "register");

	useEffect(() => {
		setIsRegister(mode === "register");
	}, [mode]);

	const handleToggleMode = (newMode) => {
		navigate(`/?mode=${newMode}`);
	};

	if (authUserLoading) return <p className="p-4">Loading User...</p>;

	return (
		<div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
			{authUser ? (
				<LoggedInHome authUser={authUser} authLogout={authLogout} />
			) : (
				<div className="flex flex-col md:flex-row h-auto md:h-[80vh] w-[80vw]">
					<div className="w-full md:w-1/2 min-h-[70vh] flex items-center justify-center p-4">
						<div className="text-center">
							<h1 className="text-6xl text-amber-50 font-bold mb-4">
								Welcome to <span className=" text-orange-500 ">Inventive</span>
							</h1>
							<p className="text-lg text-neutral-300">
								Manage your inventories with style
							</p>
							<div className="flex justify-center space-x-6 mt-6">
								<NewspaperIcon className="h-10 w-10 text-orange-400" />
								<CalculatorIcon className="h-10 w-10 text-orange-400" />
								<ReceiptPercentIcon className="h-10 w-10 text-orange-400" />
							</div>
						</div>
					</div>

					<div className="w-full md:w-1/2 min-h-[50vh] bg-[url('/recibo.jpg')] bg-cover bg-center relative p-4 ">
						<div className="absolute inset-0"></div>

						<div className="absolute inset-0 flex items-center justify-center">
							<div className="rounded-lg w-90">
								{isRegister ? <RegisterPage /> : <LoginPage />}

								{isRegister ? (
									<p className="text-center text-m font-bold mt-4 text-black">
										Already have an account?
										<button
											onClick={() => handleToggleMode("login")}
											className="text-orange-400 underline ml-1"
										>
											Login
										</button>
									</p>
								) : (
									<p className="text-center text-m font-bold mt-4 text-black">
										Don't have an account?
										<button
											onClick={() => handleToggleMode("register")}
											className="text-orange-400 underline ml-1"
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
