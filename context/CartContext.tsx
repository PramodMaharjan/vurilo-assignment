import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	quantity: number;
}

interface CartContextType {
	showCart: boolean;
	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
	cartItems: Product[];
	totalPrice: number;
	totalQuantities: number;
	qty: number;
	onAdd: (product: Product, quantity: number) => void;
	onRemove: (product: Product) => void;
	setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
	setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
	setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<CartContextType | undefined>(undefined);

const CartContext = ({ children }: { children: ReactNode }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState<Product[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct: Product | undefined;

	const onAdd = (product: Product, quantity: number) => {
		const checkProductInCart = cartItems.find((item) => item.id === product.id);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct.id === product.id) {
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
				} else {
					return {
						...cartProduct,
					};
				}
			});
			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}
	};

	const onRemove = (product: Product) => {
		foundProduct = cartItems.find((item) => item.id === product.id);
		const newCartItems = cartItems.filter((item) => item.id !== product.id);
		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - (foundProduct?.quantity || 0) * foundProduct!.price
		);
		setTotalQuantities(
			(prevTotalQuantities) =>
				prevTotalQuantities - (foundProduct?.quantity || 0)
		);
		setCartItems(newCartItems);
	};

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				onAdd,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useCartContext = () => {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error("useCartContext must be used within a CartContextProvider");
	}
	return context;
};

export default CartContext;
