import React, { useContext } from "react";

import { useNavigate } from "react-router";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import { CurrencyContext } from "../contexts/CurrencyContext.jsx";

const Sidebar = () => {
	const navigate = useNavigate();

	const { isOpen, handleClose } = useContext(SidebarContext);
	const { cart, itemAmount, total } = useContext(CartContext);
	const { currencySymbol } = useContext(CurrencyContext);

	const handleCheckout = () => {
		if (cart.length === 0) {
			alert(
				"Your cart is empty. Please add items to your cart before checking out."
			);
			return;
		}
		handleClose();
		navigate("/checkout");
	};

	return (
		<div
			className={`${
				isOpen ? "right-0" : "-right-full"
			} "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
		>
			<div className="flex items-center justify-between py-6 border-b">
				<div className="uppercase text-sm font-semibold">
					Shopping Bag ({itemAmount})
				</div>
				<div
					onClick={handleClose}
					className="cursor-poniter w-8 h-8 flex justify-center items-center"
				>
					<IoMdArrowForward className="text-2xl" />
				</div>
			</div>
			<div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
				{cart.map((item) => {
					return <CartItem item={item} key={item.id} />;
				})}
			</div>
			<div className="flex flex-col gap-y-3  mt-4">
				<div className="flex w-full justify-between items-center">
					{/* total */}
					<div className="font-semibold">
						<span className="mr-2">Subtotal:</span>
						{`${currencySymbol} ${parseFloat(total).toFixed(2)}`}
					</div>
					{/* clear cart icon */}
					<div
						onClick={() => {}}
						className="clear-cart-btn cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
					>
						<FiTrash2 />
					</div>
				</div>
				<button
					type="button"
					role="button"
					aria-label="checkout"
					onClick={handleCheckout}
					className="bg-black flex p-3 justify-center items-center text-white w-full font-medium cursor-pointer"
				>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
