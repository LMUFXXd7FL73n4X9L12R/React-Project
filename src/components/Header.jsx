import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import { CurrencyContext } from "../contexts/CurrencyContext.jsx";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/img/logo.svg";
import { BsBag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { useAuth } from "../contexts/AuthContext"; // Import the auth context

const Header = () => {
	// header state
	const [isActive, setIsActive] = useState(false);
	const { itemAmount } = useContext(CartContext);
	const { currentUser, logout } = useAuth(); // Add authentication context
	const navigate = useNavigate(); // Add navigation hook

	// currency state
	const { currency } = useContext(CurrencyContext);

	// event listener
	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
		});
	});

	// Handle user icon click - show dropdown or navigate to login
	const [showUserMenu, setShowUserMenu] = useState(false);

	const handleUserClick = () => {
		if (currentUser) {
			setShowUserMenu(!showUserMenu);
		} else {
			navigate("/login");
		}
	};

	// Handle logout
	const handleLogout = async () => {
		try {
			await logout();
			setShowUserMenu(false);
			navigate("/");
		} catch (error) {
			console.error("Failed to log out", error);
		}
	};

	return (
		<header
			className={`${
				isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
			} fixed w-full z-10 lg:px-8 transition-all`}
		>
			<div className="container mx-auto flex items-center justify-between h-full">
				<Link to={"/"}>
					<div className="flex items-center">
						<img src={Logo} alt="" className="w-[40px]" />
						<span className="ms-4">Urban Loom</span>
					</div>
				</Link>

				<div className="flex items-center gap-4">
					{/* currency select */}
					<select
						value={currency}
						onChange={() => {}}
						className="border border-slate-800 rounded-md px-3 py-2 focus:outline-none text-slate-800 text-sm"
						aria-label="Select currency"
					>
						<option value="USD">🇺🇸 USD</option>
						<option value="EUR">🇪🇺 EUR</option>
						<option value="GBP">🇬🇧 GBP</option>
					</select>

					{/* cart */}
					<div
						onClick={() => {}}
						className="cart-btn cursor-pointer flex relative"
						role="button"
						aria-label="cart"
					>
						<BsBag className="text-2xl" />
						<div className="bg-slate-800 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
							{itemAmount}
						</div>
					</div>

					{/* user */}
					<div
						onClick={handleUserClick}
						className="cursor-pointer flex relative"
						role="button"
						aria-label="user account"
					>
						<CiUser className="text-3xl" />
						{currentUser && (
							<div className="bg-slate-800 absolute -right-2 -top-2 w-[10px] h-[10px] rounded-full"></div>
						)}

						{/* User dropdown menu */}
						{showUserMenu && currentUser && (
							<div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-48 z-20">
								<div className="px-4 py-2 border-b text-xs font-semibold text-gray-500">
									Signed in as:
								</div>
								<div className="px-4 py-1 text-sm truncate">
									{currentUser.email}
								</div>
								<div className="border-t mt-2">
									<Link
										to="/profile"
										className="block px-4 py-2 text-sm hover:bg-gray-100"
										onClick={() => setShowUserMenu(false)}
									>
										Profile
									</Link>
									<button
										onClick={handleLogout}
										className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
									>
										Log Out
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
