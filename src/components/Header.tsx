import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const { VITE_APP_NAME } = import.meta.env;

// -------------------------
const Header = () => {
	const { authUser, authLogout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		authLogout();
		navigate("/");
	};

	return (
		<header className="flex justify-between items-center p-6 mr-3 text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
			<h1 className="text-2xl font-bold text-white">
				<NavLink to="/">{VITE_APP_NAME}</NavLink>
			</h1>
			<nav>
				<ul className="flex gap-4 text-gray-700">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								`hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
									isActive ? "font-bold text-white" : "text-white"
								}`
							}
						>
							Home
						</NavLink>
					</li>

					{!authUser && (
						<>
							<li>
								<NavLink
									to="/?mode=register"
									className={({ isActive }) =>
										`hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
											isActive ? "font-bold text-white" : "text-white"
										}`
									}
								>
									Register
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/?mode=login"
									className={({ isActive }) =>
										`hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
											isActive ? "font-bold text-white" : "text-white"
										}`
									}
								>
									Login
								</NavLink>
							</li>
						</>
					)}

					{authUser && (
						<>
							{/* <li className="font-medium text-white">
                <span className="text-orange-400">{authUser.username}</span>
              </li> */}

							<li>
								<NavLink
									to="/profile"
									className={({ isActive }) =>
										`hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
											isActive ? "font-bold text-orange-400" : "text-white"
										}`
									}
								>
									Profile
								</NavLink>
							</li>

							<li>
								<NavLink
									to="/inventories"
									className={({ isActive }) =>
										`hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
											isActive ? "font-bold text-orange-400" : "text-white"
										}`
									}
								>
									My inventories
								</NavLink>
							</li>

							{authUser.role === "admin" && (
								<li>
									<NavLink
										to="/admin"
										className={({ isActive }) =>
											`text-white hover:text-blue-500 ${isActive ? "font-bold" : ""}`
										}
									>
										User management
									</NavLink>
								</li>
							)}

							<li>
								<button
									type="button"
									onClick={handleLogout}
									className="font-semibold text-white hover:text-orange-400 cursor-pointer"
								>
									Logout
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
