import Cart from "./Cart";
import { useCartContext } from "../context/CartContext";

import { FiShoppingCart } from "react-icons/fi";
import { PiPottedPlantLight } from "react-icons/pi";
import { TbCategory2 } from "react-icons/tb";
import { TbFilterPlus } from "react-icons/tb";

interface CartContextType {
	showCart: boolean;
	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
	totalQuantities: number;
}

const Sidebar: React.FC = () => {
	const { showCart, setShowCart, totalQuantities } =
		useCartContext() as CartContextType;
	const iconStyle = "sm:w-5 md:w-6 lg:w-8 xl:w-10 w-4  text-gray-600";
	return (
		<>
			<div
				className="sm:h-[32%] sm:w-14 h-[28%] w-8 z-10 absolute top-52 md:left-16 xs:left-2
                           flex justify-center items-center
                           rounded-full bg-[white] bg-opacity-60 backdrop-blur-3xl"
			>
				<div className="flex flex-col justify-center items-center xs:gap-4 gap-2">
					<TbFilterPlus size={25} className={iconStyle} />
					<PiPottedPlantLight size={25} className={iconStyle} />
					<button
						onClick={() => setShowCart((prevState: boolean) => !prevState)}
					>
						<div className="relative">
							<FiShoppingCart size={25} className={iconStyle} />
							<span
								className="absolute -top-2 -right-1 text-center
                                   rounded-full h-[17px] w-[17px] bg-white text-[12px]"
							>
								{totalQuantities}
							</span>
						</div>
					</button>
					<TbCategory2 size={25} className={iconStyle} />
				</div>
			</div>
			{showCart && <Cart />}
		</>
	);
};

export default Sidebar;
