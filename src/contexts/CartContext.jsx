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
		const total = cart.reduce((accumulator, currentItem) => {
			return accumulator + currentItem.price * currentItem.amount;
		}, 0);
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
	const addToCart = (product, id) => {
		const cartItem = cart.find((item) => item.id === id);
		if (cartItem) {
			const newCart = cart.map((item) => {
				if (item.id === id) {
					return { ...item, amount: item.amount + 1 };
				} else return item;
			});
			setCart(newCart);
		} else {
			setCart([...cart, { ...product, amount: 1 }]);
		}
	};

	// remove from cart
	const removeFromCart = (id) => {
		const newCart = cart.filter((item) => item.id !== id);
		setCart(newCart);
	};

	// clear cart
	const clearCart = () => {
		setCart([]);
	};

	// increase amount
	const increaseAmount = (id) => {
		const cartItem = cart.find((item) => item.id === id);
		if (cartItem) {
			const newCart = cart.map((item) =>
				item.id === id ? { ...item, amount: item.amount + 1 } : item
			);
			setCart(newCart);
		}
	};

	// decrease amount
	const decreaseAmount = (id) => {
		const cartItem = cart.find((item) => item.id === id);
		if (cartItem) {
			if (cartItem.amount > 1) {
				const newCart = cart.map((item) =>
					item.id === id ? { ...item, amount: item.amount - 1 } : item
				);
				setCart(newCart);
			} else {
				removeFromCart(id);
			}
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
