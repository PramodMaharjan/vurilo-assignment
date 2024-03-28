import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import useFetch from "../hooks/useFetch";

import Image from "next/image";

interface Product {
	id: number;
	name: string;
	price: string;
	image: string;
}

interface CartContext {
	onAdd: (item: Product, quantity: number) => void;
}

const ProductCard: React.FC = () => {
	const { products, isLoading, error } = useFetch({ url: "/products.json" });
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [cartItem, setCartItem] = useState<Product | null>(null);
	const { onAdd } = useCartContext() as CartContext;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	const handleProductClick = (index: number) => {
		setCurrentIndex(index);
		if (products !== null) {
			setCartItem(products[index]);
		}
	};

	return (
		<>
			{cartItem && (
				<div
					className="z-10 absolute bottom-8 sm:rounded-full rounded-2xl
								 bg-[white] bg-opacity-30 backdrop-blur-2xl"
				>
					<div
						className="sm:flex sm:justify-around grid justify-center items-center 
									 sm:w-80 sm:h-[70px] sm:p-0 px-8 py-2 "
					>
						<div className="flex gap-2 text-center sm:flex-col sm:text-start sm:gap-0 text-white">
							<p>{cartItem.name}</p>
							<p className="font-bold">${cartItem.price}</p>
						</div>
						<div
							className="flex justify-center items-center sm:w-24 sm:h-10 sm:p-0 py-[6px] 
										rounded-full bg-[white] text-xs font-semibold"
						>
							<button onClick={() => onAdd(cartItem, 1)}>+ Add to Cart</button>
						</div>
					</div>
				</div>
			)}

			<div
				className="mx-auto w-3/4 h-[80%] flex justify-center items-center 
						rounded-3xl bg-[white] bg-opacity-25 backdrop-blur-lg"
			>
				<div className="mx-auto w-3/4 xs:h-auto h-[95%] overflow-hidden">
					<div
						className="justify-center items-center grid grid-cols-1  xs:grid-cols-3"
						style={{
							transform: `translateX(${-(
								((currentIndex !== null ? currentIndex : 0) * 10) /
								(products ? products.length : 1)
							)}%)`,
							...(window.innerWidth <= 480 && {
								transform: `translateY(${-(
									((currentIndex !== null ? currentIndex : 0) * 10) /
									(products ? products.length : 1)
								)}%)`,
							}),
							transition: "transform 1s ease-in-out",
						}}
					>
						{products?.map((product: Product, index: number) => {
							const selectedProduct = index === currentIndex;
							return (
								<div
									key={product.id}
									className={`flex flex-col justify-center items-center cursor-pointer 
											transition-transform duration-300 ${
												selectedProduct
													? "xs:scale-150 scale-110"
													: "xs:scale-50 scale-50"
											}`}
									onClick={() => handleProductClick(index)}
								>
									<Image
										src={product.image}
										alt={product.name}
										width={500}
										height={500}
										className="object-cover"
									/>
									{selectedProduct ? (
										""
									) : (
										<div className="text-center">
											<h3 className="text-lg font-normal text-white">
												{product.name}
											</h3>
											<p className="text-xl text-white font-bold tracking-widest">
												${product.price}
											</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
