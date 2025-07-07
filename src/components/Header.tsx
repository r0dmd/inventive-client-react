import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
const { VITE_APP_NAME } = import.meta.env;

const Header = () => {
	const { authUser, authLogout } = useAuth();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = () => {
		authLogout();
		navigate("/");
	};

	return (
		<header className="flex justify-between items-center p-6 text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
			<h1 className="text-2xl font-bold text-orange-400 ml-4">
				<NavLink to="/">{VITE_APP_NAME}</NavLink>
			</h1>

			<button
				type="button"
				className="md:hidden text-white text-4xl hover:text-orange-400 transition duration-300"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<GiHamburgerMenu />
			</button>

			<nav className="hidden md:block">
				<ul className="flex gap-4 text-gray-700 mr-4">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								`hover:text-orange-400 px-2 py-1 rounded ${
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
									className="hover:text-orange-400 text-white px-2 py-1 rounded"
								>
									Register
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/?mode=login"
									className="hover:text-orange-400 text-white px-2 py-1 rounded"
								>
									Login
								</NavLink>
							</li>
						</>
					)}

					{authUser && (
						<>
							<li>
								<NavLink
									to="/profile"
									className="hover:text-orange-400 text-white px-2 py-1 rounded"
								>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/inventories"
									className="hover:text-orange-400 text-white px-2 py-1 rounded"
								>
									My inventories
								</NavLink>
							</li>
							{authUser.role === "admin" && (
								<li>
									<NavLink
										to="/admin"
										className="hover:text-blue-500 text-white px-2 py-1 rounded"
									>
										User management
									</NavLink>
								</li>
							)}
							<li>
								<button
									type="button"
									onClick={handleLogout}
									className="hover:text-orange-400 text-white cursor-pointer"
								>
									Logout
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>

			{menuOpen && (
				<div className="absolute top-20 right-6 text-xl bg-gray-900 p-4 opacity-90 rounded shadow-lg md:hidden z-50">
					<ul className="flex flex-col gap-2">
						<li>
							<NavLink
								to="/"
								onClick={() => setMenuOpen(false)}
								className="text-white hover:text-orange-400"
							>
								Home
							</NavLink>
						</li>

						{!authUser && (
							<>
								<li>
									<NavLink
										to="/?mode=register"
										onClick={() => setMenuOpen(false)}
										className="text-white hover:text-orange-400"
									>
										Register
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/?mode=login"
										onClick={() => setMenuOpen(false)}
										className="text-white hover:text-orange-400"
									>
										Login
									</NavLink>
								</li>
							</>
						)}

						{authUser && (
							<>
								<li>
									<NavLink
										to="/profile"
										onClick={() => setMenuOpen(false)}
										className="text-white hover:text-orange-400"
									>
										Profile
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/inventories"
										onClick={() => setMenuOpen(false)}
										className="text-white hover:text-orange-400"
									>
										My inventories
									</NavLink>
								</li>
								{authUser.role === "admin" && (
									<li>
										<NavLink
											to="/admin"
											onClick={() => setMenuOpen(false)}
											className="text-white hover:text-blue-500"
										>
											User management
										</NavLink>
									</li>
								)}
								<li>
									<button
										type="button"
										onClick={() => {
											handleLogout();
											setMenuOpen(false);
										}}
										className="text-white hover:text-orange-400"
									>
										Logout
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			)}
		</header>
	);
};

export default Header;
