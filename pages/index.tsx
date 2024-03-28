import React from "react";

import ProductCard from "@/components/ProductCard";

const Home: React.FC = () => {
	return (
		<div className="relative flex justify-center items-center bg-background-image bg-no-repeat bg-cover h-screen">
			<ProductCard />
		</div>
	);
};

export default Home;
