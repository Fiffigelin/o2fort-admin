import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			fontFamily: {
				display: ["'Plus Jakarta Sans'", "sans-serif"],
				body: ["'Inter'", "sans-serif"],
				cursive: ["Pacifico", "cursive"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
