import { NavLink } from "react-router-dom";

// ------------------------------------------
const Footer = () => {
	return (
		<footer className="max-w-screen flex flex-col items-center justify-between gap-4 p-4 bg-gray-800 text-white">
			<div>
				<ul className="flex flex-row gap-2 ">
					<li className=" hover:underline">Inventive</li>

					<li className="hover:underline">
						<NavLink title="About us" to="/about">
							About us
						</NavLink>
					</li>

					<li className="hover:underline">
						<NavLink title="Privacy policy" to="/privacy">
							Privacy policy
						</NavLink>
					</li>

					<li className="hover:undeline">
						&copy; <strong className="text-orange-400">2025</strong>
					</li>
				</ul>
			</div>

			{/* Redes sociales */}
			<div className="flex flex-row gap-4 m-2 items-center">
				<p className="text-sm">Created by:</p>

				<a
					className="border border-transparent hover:border hover:border-orange-400 rounded-full p-1 transition"
					href="https://www.linkedin.com/in/rodrigo-md/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Linkedin Rodrigo"
				>
					<img
						src="https://avatars.githubusercontent.com/u/143725306?v=4"
						alt="Rodrigo's logo"
						className="w-10 h-10 rounded-full"
					/>
				</a>

				<a
					className="border border-transparent  hover:border hover:border-orange-400 rounded-full p-1 transition"
					href="https://www.linkedin.com/in/alexander-perez-banks/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Linkedin Alex"
				>
					<img
						src="https://avatars.githubusercontent.com/u/88187553?v=4"
						alt="Alex logo"
						className="w-10 h-10 rounded-full"
					/>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
