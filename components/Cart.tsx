import Image from "next/image";

import { useCartContext } from "../context/CartContext";

import { RiDeleteBin5Line } from "react-icons/ri";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

// interface CartItem {
// 	id: number;
// 	name: string;
// 	price: string;
// 	image: string;
// }

// interface CartContext {
// 	setShowCart: (value: boolean) => void;
// 	totalQuantities: number;
// 	cartItems: CartItem[];
// 	onRemove: (item: CartItem) => void;
// }

const Cart: React.FC = () => {
	const { setShowCart, totalQuantities, cartItems, onRemove } =
		useCartContext();

	const handleCheckout = () => {
		console.log("Checkout");
	};

	return (
		<div className="z-20 fixed top-0 left-0 h-full w-full animate-backdrop">
			<div className="relative flex w-full h-full">
				<div
					className="absolute top-0 w-full h-full"
					onClick={() => setShowCart((prevState: boolean) => !prevState)}
				/>
			</div>
			<div className="fixed right-0 bottom-0 flex flex-col items-center md:w-1/3 sm:w-1/2 xs:w-4/6 w-5/6 h-full bg-gray-50 animate-mini-cart">
				<div className="py-6 xs:flex justify-center gap-2">
					<h2 className="text-[14px] font-[700] text-center">YOUR BAG</h2>
					<div>({totalQuantities} items)</div>
				</div>
				<div className="absolute top-5 right-2 p-1 cursor-pointer">
					<IoClose
						size={23}
						onClick={() => setShowCart((prevState: boolean) => !prevState)}
					/>
				</div>
				{cartItems.length < 1 && (
					<div className="flex flex-col justify-center items-center mt-20">
						<RiShoppingBag3Fill size={150} className="text-gray-400 mb-4" />
						<h3 className="xs:text-[16px] text-[12px] font-[700] mb-2">
							YOUR BAG IS EMPTY
						</h3>
						<p className="font-roboto xs:text-[14px] text-[10px] font-[500] text-gray-500">
							There are no products in your bag
						</p>
					</div>
				)}
				{cartItems.length >= 1 && (
					<div className="relative flex flex-col justify-center items-center gap-10">
						<div className="overflow-auto max-h-[70vh] py-5">
							{cartItems.map((item) => (
								<div
									className="flex justify-center items-center p-[20px] gap-7"
									key={item.id}
								>
									<div className="xs:h-24 xs:w-32 h-16 w-24">
										<Image
											src={item.image}
											alt="Cart-Product-Image"
											height={120}
											width={150}
											className="rounded-lg bg-[#ebebeb]"
										/>
									</div>
									<div className="xs:flex xs:gap-6 xs:justify-start xs:items-center text-gray-900">
										<div className="flex-col text-start xs:gap-6 mt-4">
											<span className="xs:text-[16px] text-[14px]">
												{item.name}
											</span>
											<h4 className="xs:text-[16px] text-[14px] font-[700]">
												${item.price}
											</h4>
										</div>
										<button
											className="rounded-full bg-[#ebebeb] w-8 h-8 flex justify-center items-center"
											onClick={() => onRemove(item)}
										>
											<RiDeleteBin5Line size={18} />
										</button>
									</div>
								</div>
							))}
						</div>
						<div className="flex rounded-lg bg-blue-600 h-8 w-44 font-semibold text-white text-center justify-center">
							<button type="button" onClick={handleCheckout}>
								CHECKOUT
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
