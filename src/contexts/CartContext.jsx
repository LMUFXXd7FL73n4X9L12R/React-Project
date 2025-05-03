import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	// cart state
	const [cart, setCart] = useState([]);
	// item amount state
	const [itemAmount, setItemAmount] = useState(0);
	// total price state
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
		setTotal(total);
	}, [cart]);

	// update item amount
	useEffect(() => {
		if (cart) {
			const amount = cart.reduce((accumulator, currentItem) => {
				return accumulator + currentItem.amount;
			}, 0);
			setItemAmount(amount);
		}
	}, [cart]);

	// add to cart
	const addToCart = (product) => {
		const existingItem = cart.find((item) => item.id === product.id);
		if (existingItem) {
			setCart(
				cart.map((item) =>
					item.id === product.id
						? { ...item, amount: item.amount + 1 }
						: item
				)
			);
		} else {
			setCart([...cart, { ...product, amount: 1 }]);
		}
	};

	// remove from cart
	const removeFromCart = (id) => {
		const newCart = cart.filter((item) => {
			return item.id !== id;
		});
		setCart(newCart);
	};

	// clear cart
	const clearCart = () => {
		setCart([]);
	};

	// increase amount
	const increaseAmount = (id) => {
		setCart(
			cart.map((item) =>
				item.id === id ? { ...item, amount: item.amount + 1 } : item
			)
		);
	};

	// decrease amount
	const decreaseAmount = (id) => {
		const item = cart.find((item) => item.id === id);
		if (item.amount === 1) {
			setCart(cart.filter((item) => item.id !== id));
		} else {
			setCart(
				cart.map((item) =>
					item.id === id ? { ...item, amount: item.amount - 1 } : item
				)
			);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				increaseAmount,
				decreaseAmount,
				itemAmount,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
