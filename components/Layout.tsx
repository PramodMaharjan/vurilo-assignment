import React, { ReactNode } from "react";
import Head from "next/head";

import Sidebar from "../components/Sidebar";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<Head>
				<title>Vurilo</title>
			</Head>
			<div>
				<Sidebar />
				<main>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
