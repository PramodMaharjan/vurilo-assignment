import type { AppProps } from "next/app";

import Layout from "../components/Layout";
import CartContext from "../context/CartContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<CartContext>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CartContext>
	);
}
