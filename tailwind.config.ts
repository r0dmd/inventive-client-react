// for Headwind extension to sort Tailwind classes, nothing else (not needed if using vite tailwind plugin)
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;
