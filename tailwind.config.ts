import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				backdrop: {
					"0%": {
						"background-color": "transparent",
					},
					"100%": {
						"background-color": "rgba(0,0,0,.8)",
					},
				},
				"mini-cart": {
					"0%": {
						transform: "translatex(100%)",
					},
					"100%": {
						transform: "translateX(0%)",
					},
				},
			},
			animation: {
				backdrop: "backdrop 0.2s forwards",
				"mini-cart": "mini-cart 0.4s forwards",
			},
			backgroundImage: {
				"background-image": "url('/background.jpeg')",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			screens: { xs: "480px", sm: "768px", md: "1060px" },
		},
	},
	plugins: [],
};
export default config;
